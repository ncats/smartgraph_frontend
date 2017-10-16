import { Component, OnInit } from '@angular/core';
import {Node} from '../../../d3/models/node';
import {NodeService} from '../../../d3/models/node.service';
import {Subscription} from "rxjs";
import {Link} from "../../../d3/models/link";

@Component({
  selector: 'node-details-visual',
  templateUrl: './node-details-visual.component.html',
  styleUrls: ['./node-details-visual.component.css']
})
export class NodeDetailsVisualComponent implements OnInit {

  subscription: Subscription;
  hoveredNode: Node;
  downstreamLinks: Link[];
  upstreamLinks: Link[];
  node:Node;

  constructor(private nodeService: NodeService) {
  }

  ngOnInit() {
    this.subscription = this.nodeService.hoverednode$
      .subscribe(node => {
        this.hoveredNode = node.node;
        this.getSmiles(node.node);
        this.downstreamLinks = node.down;
        this.upstreamLinks = node.up;
      });
  }
  getSmiles(node : any): string{
    if(node.properties && node.properties.smiles) {
     return 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ this.parseSmiles(node.properties.smiles) +'&standardize=true&format=svg';
    }else if(node.properties && node.properties.canonical_smiles){
      return 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ this.parseSmiles(node.properties.canonical_smiles) +'&standardize=true&format=svg';
    }else{
      return null;
    }

  }

  parseSmiles(smiles: string): string {
    let parsed = smiles
      .replace(/[;]/g,'%3B')
      .replace(/[#]/g,'%23')
      .replace(/[+]/g,'%2B')
      .replace(/[\\]/g,'%5C')
      .replace(/[|]/g,'%7C');
    return parsed;
  }


}

