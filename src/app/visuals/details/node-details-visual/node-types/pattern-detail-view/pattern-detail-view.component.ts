import {Component, OnInit, Input} from '@angular/core';
import {Pattern} from "../../../../../d3/models/node";
import {Link} from "../../../../../d3/models/link";

@Component({
  selector: 'pattern-detail-view',
  templateUrl: 'pattern-detail-view.component.html',
  styleUrls: ['pattern-detail-view.component.css']
})
export class PatternDetailViewComponent implements OnInit {
  @Input()
  data:any;
  node: Pattern;
  downstreamLinks: Link[];
  upstreamLinks: Link[];
  constructor() { }

  ngOnInit() {
    this.node= this.data.node;
    this.downstreamLinks = this.data.down;
    this.upstreamLinks = this.data.up;
    this.getSmiles(this.node);

  }
  getSmiles(node : any): string{
    if(node.properties && node.properties.smiles) {
      return 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ this.parseSmiles(node.properties.smiles) +'&standardize=true&format=svg';
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
