import {Component, OnInit, Input} from '@angular/core';
import {Node} from '../../../d3/models/node';
import {NodeService} from '../../../d3/models/node.service';
import {Subscription} from 'rxjs';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'node-details-visual',
  templateUrl: 'node-details-visual.component.html',
  styleUrls: ['node-details-visual.component.css']
})
export class NodeDetailsVisualComponent implements OnInit {
  @Input() data: Node;

  displayedColumns = ['source'];
  linkSubscription: Subscription;
  dataSource = new MatTableDataSource<any>();
  subscription: Subscription;
  hoveredNode: any;
  nodeType: string;

  constructor(private nodeService: NodeService) {
  }

  ngOnInit() {
    this.subscription = this.nodeService.nodeList$
      .subscribe(res => {
        this.dataSource.data = Array.from(res.clicked);
      });
    if (this.data) {
      this.dataSource.data = [this.data];
    }
  }

  getNodeType(node:Node): string {
      return node._type;
  }

}
