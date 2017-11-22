import {Component, OnInit, Input} from '@angular/core';
import {Pattern} from '../../../../../d3/models/node';
import {Link} from '../../../../../d3/models/link';

@Component({
  selector: 'pattern-detail-view',
  templateUrl: 'pattern-detail-view.component.html',
  styleUrls: ['pattern-detail-view.component.css']
})
export class PatternDetailViewComponent implements OnInit {
  @Input()
  node: Pattern;
  @Input()
  downstreamLinks: Link[];
  @Input()
  upstreamLinks: Link[];
  nodeSmiles: string;

  constructor() {
  }

  ngOnInit() {
         this.getSmiles();
   }

  getSmiles(): void {
    if (this.node.smiles) {
      this.nodeSmiles = 'https://tripod.nih.gov/servlet/renderServletv12/?structure=' + this.parseSmiles(this.node.smiles) + '&standardize=true&format=svg';
    }
  }

  parseSmiles(smiles: string): string {
    const parsed = smiles
      .replace(/[;]/g, '%3B')
      .replace(/[#]/g, '%23')
      .replace(/[+]/g, '%2B')
      .replace(/[\\]/g, '%5C')
      .replace(/[|]/g, '%7C');
    return parsed;
  }

  ngOnChanges(changes){
    this.getSmiles();
  }
}
