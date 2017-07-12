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


  constructor(private nodeService: NodeService) {
  }

  ngOnInit() {
    this.subscription = this.nodeService.hoverednode$
      .subscribe(node => {
        this.hoveredNode = node;
        console.log(this.hoveredNode)
      });
  }
}
