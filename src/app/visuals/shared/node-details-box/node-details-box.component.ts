import { Component, OnInit } from '@angular/core';

import {Target, Compound, Pattern, Node} from '../../../d3/models/node';
import {Link} from '../../../d3/models/link';
import {NodeService} from '../../../d3/models/node.service';
import {LinkService} from '../../../d3/models/link.service';
import {D3Service} from '../../../d3/d3.service';
import {GraphDataService} from '../../../services/graph-data.service';

@Component({
  selector: 'app-node-details-box',
  templateUrl: './node-details-box.component.html',
  styleUrls: ['./node-details-box.component.scss']
})
export class NodeDetailsBoxComponent implements OnInit {

  node: Target | Compound | Pattern;
  link: Link;

  constructor(
    private nodeService: NodeService,
    private linkService: LinkService,
    private d3Service: D3Service,
    private graphDataService: GraphDataService
  ) { }

  ngOnInit() {
    this.nodeService.nodeList$.subscribe(res => {
      this.node = res.hovered[0];
    });
    this.linkService.linkslist$.subscribe(res => this.link = res.hovered[0]);
  }

  getLabel(value: number): string {
    if (!value || value === -100) {
      return 'no data';
    } else {
      return value.toExponential(2);
    }
  }

  foundNode(event) {
    this.d3Service._clearNodes();
    this.nodeService.hoveredNode([event]);
    this.d3Service._manualClick(event, this.graphDataService.returnGraph());
  }

  getNodeType(node: Node): string {
    return this.node._type;
  }

}
