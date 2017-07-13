import { Component, OnInit } from '@angular/core';
import {Node, NodeService} from '../../../d3';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-node-details-visual',
  templateUrl: './node-details-visual.component.html',
  styleUrls: ['./node-details-visual.component.css']
})
export class NodeDetailsVisualComponent implements OnInit {
  subscription: Subscription;
  hoveredNode: Node;
  imageUrl: string;


  constructor(private nodeService: NodeService) {
  }

  ngOnInit() {
    this.subscription = this.nodeService.hoverednode$
      .subscribe(node => {
        this.hoveredNode = node;
        this.getSmiles(node);
        console.log(this.hoveredNode)
      });
  }
  getSmiles(node : any): void{
    if(node.properties && node.properties.smiles) {
      this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ this.parseSmiles(node.properties.smiles) +'&standardize=true&format=svg';
    }else if(node.properties && node.properties.canonical_smiles){
      this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ this.parseSmiles(node.properties.canonical_smiles) +'&standardize=true&format=svg';
    }else{
      this.imageUrl = null;
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

