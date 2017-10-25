import {Component, OnInit, Input} from '@angular/core';
import {Link} from "../../../../../d3/models/link";
import {Target} from "../../../../../d3/models/node";
import {Subscription} from "rxjs";
import {NodeService} from "../../../../../d3/models/node.service";

@Component({
  selector: 'target-detail-view',
  templateUrl: 'target-detail-view.component.html',
  styleUrls: ['target-detail-view.component.css']
})
export class TargetDetailViewComponent implements OnInit {
  @Input() data: any;

  node: Target;
  downstreamLinks: Link[];
  upstreamLinks: Link[];

  uniprotUrl: string;
  subscription: Subscription;

  constructor(private nodeService: NodeService) {
  }

  ngOnInit() {
    this.subscription = this.nodeService.hoverednode$
      .subscribe(data => {
        console.log(data);
        this.node = data.node;
        this.downstreamLinks = data.down;
        this.upstreamLinks = data.up;
       // this.uniprotUrl = "https://www.ebi.ac.uk/chembl/target/inspect/" + data.node.uniprot_id;
      });

  }
}
