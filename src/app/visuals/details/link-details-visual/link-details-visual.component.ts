import {Component, OnInit, Input} from '@angular/core';
import {Link} from '../../../d3/models/link';
import {Node} from '../../../d3/models/node';
import {Subscription} from "rxjs";
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
        console.log(link);
        this.link = link;
        this.node = link.target;
      });
    if(this.data){
      this.link = this.data;
    }
  }
/*
  getSmiles(node : Node): string{
    if(node.properties && node.properties.smiles) {
      return 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ LinkDetailsVisualComponent.parseSmiles(node.properties.smiles) +'&standardize=true&format=svg';
    }else if(node.properties && node.properties.canonical_smiles){
      return 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ LinkDetailsVisualComponent.parseSmiles(node.properties.canonical_smiles) +'&standardize=true&format=svg';
    }else{
      return null;
    }*/

/*  }

  private static parseSmiles(smiles: string): string {
    return smiles
      .replace(/[;]/g,'%3B')
      .replace(/[#]/g,'%23')
      .replace(/[+]/g,'%2B')
      .replace(/[\\]/g,'%5C')
      .replace(/[|]/g,'%7C');
  }*/


}
