import { Component, OnInit } from '@angular/core';
import {Node} from '../../../d3/models/node';
import {NodeService} from '../../../d3/models/node.service';
import {Subscription} from "rxjs";
import {Link} from "../../../d3/models/link";

@Component({
  selector: 'node-details-visual',
  templateUrl: 'node-details-visual.component.html',
  styleUrls: ['node-details-visual.component.css']
})
export class NodeDetailsVisualComponent implements OnInit {

  subscription: Subscription;
  hoveredNode: Node;
  downstreamLinks: Link[];
  upstreamLinks: Link[];
  nodeType:string;
  //node:Node;

  constructor(private nodeService: NodeService) {
  }

  ngOnInit() {
    this.subscription = this.nodeService.hoverednode$
      .subscribe(node => {
        this.hoveredNode = node;
        this.nodeType = node.node.constructor.name;

      });
  }
}

