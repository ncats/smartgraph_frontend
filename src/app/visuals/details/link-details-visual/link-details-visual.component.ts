import {Component, OnInit, Input} from '@angular/core';
import {Link} from '../../../d3/models/link';
import {Node} from '../../../d3/models/node';
import {Subscription} from 'rxjs/Subscription';
import {LinkService} from '../../../d3/models/link.service';


@Component({
  selector: 'link-details-visual',
  templateUrl: 'link-details-visual.component.html',
  styleUrls: ['link-details-visual.component.css']
})
export class LinkDetailsVisualComponent implements OnInit {
 @Input() data: Link;
 @Input() node: Node;
 link: Link;
 linkSubscription: Subscription;

  constructor(private linkService: LinkService) { }

  ngOnInit() {
    this.linkSubscription = this.linkService.hoveredlink$
      .subscribe(link => {
        this.link = link;
        this.node = link.target;
      });
    if (this.data){
      this.link = this.data;
    }
  }
}
