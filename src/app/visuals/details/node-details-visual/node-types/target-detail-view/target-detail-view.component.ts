import {Component, OnInit, Input} from '@angular/core';
import {Link} from "../../../../../d3/models/link";
import {Target} from "../../../../../d3/models/node";

@Component({
  selector: 'target-detail-view',
  templateUrl: 'target-detail-view.component.html',
  styleUrls: ['target-detail-view.component.css']
})
export class TargetDetailViewComponent implements OnInit {
  @Input()
  data: any;
  node: Target;
  downstreamLinks: Link[];
  upstreamLinks: Link[];

  uniprotUrl:string;
  constructor() {
  }

  ngOnInit() {
    this.node= this.data.node;
    this.downstreamLinks = this.data.down;
    this.upstreamLinks = this.data.up;
    console.log(this);
    this.uniprotUrl ="https://www.ebi.ac.uk/chembl/target/inspect/"+ this.node.uniprot_id;
  }

}
