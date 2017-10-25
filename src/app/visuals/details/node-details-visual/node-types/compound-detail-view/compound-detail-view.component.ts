import {Component, OnInit, Input} from '@angular/core';
import {Compound} from "../../../../../d3/models/node";
import {Link} from "../../../../../d3/models/link";

@Component({
  selector: 'compound-detail-view',
  templateUrl: 'compound-detail-view.component.html',
  styleUrls: ['compound-detail-view.component.css']
})
export class CompoundDetailViewComponent implements OnInit {
@Input()
data:any;
node: Compound;
  downstreamLinks: Link[];
  upstreamLinks: Link[];
  constructor() { }

  ngOnInit() {
    console.log(this.data);
    this.node= this.data.node;
    this.downstreamLinks = this.data.down;
    this.upstreamLinks = this.data.up;
    this.getSmiles(this.node);
  }

  getSmiles(node : any): string{
    console.log(node);
    if(node.smiles) {
      return 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ this.parseSmiles(node.smiles) +'&standardize=true&format=svg';
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
