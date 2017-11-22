import { Component, OnInit } from '@angular/core';
import {NodeService} from '../../../d3/models/node.service';
import {LinkService} from '../../../d3/models/link.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-graph-details',
  templateUrl: 'graph-details.component.html',
  styleUrls: ['graph-details.component.css']
})
export class GraphDetailsComponent implements OnInit {
  nodeSubscription: Subscription;
  linkSubscription: Subscription;
  hoveredObjType: string;

  constructor(
    private nodeService: NodeService,
    private linkService: LinkService
  ) {}

  ngOnInit() {
    this.nodeSubscription = this.nodeService.hoverednode$
      .subscribe(node => {
        this.hoveredObjType = 'node';
      });
    this.linkSubscription = this.linkService.hoveredlink$
      .subscribe(link => {
        this.hoveredObjType = 'link';
      });
  }
}
