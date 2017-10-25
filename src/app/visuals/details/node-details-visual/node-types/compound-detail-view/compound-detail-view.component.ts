import {Component, OnInit, Input} from '@angular/core';
import {Compound} from "../../../../../d3/models/node";
import {Link} from "../../../../../d3/models/link";
import {NodeService} from "../../../../../d3/models/node.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'compound-detail-view',
  templateUrl: 'compound-detail-view.component.html',
  styleUrls: ['compound-detail-view.component.css']
})
export class CompoundDetailViewComponent implements OnInit {
@Input()
node: Compound;
  @Input()
downstreamLinks: Link[];
  @Input()
  upstreamLinks: Link[];
  nodeSmiles:string;

  constructor() {
  }

  ngOnInit() {
  }

  getSmiles(): void {
    if (this.node.smiles) {
      this.nodeSmiles = 'https://tripod.nih.gov/servlet/renderServletv12/?structure=' + this.parseSmiles(this.node.smiles) + '&standardize=true&format=svg';
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

  ngOnChanges(changes){
    this.getSmiles();
  }
}
