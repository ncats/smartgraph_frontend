import {Component, OnInit, Input} from '@angular/core';
import {Pattern} from "../../../../../d3/models/node";
import {Link} from "../../../../../d3/models/link";
import {Subscription} from "rxjs";
import {NodeService} from "../../../../../d3/models/node.service";

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
  subscription: Subscription;

  constructor(private nodeService: NodeService) {
  }

  ngOnInit() {
    if(this.data){
      this.node = this.data.node;
    }
    this.subscription = this.nodeService.hoverednode$
      .subscribe(data => {
        console.log(data);
        this.node = data.node;
        this.downstreamLinks = data.down;
        this.upstreamLinks = data.up;
        this.getSmiles(this.node);
      });
  }

  getSmiles(node : any): string{
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
