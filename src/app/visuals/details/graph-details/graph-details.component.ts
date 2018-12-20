import { Component, OnInit } from '@angular/core';
import {NodeService} from '../../../d3/models/node.service';
import {LinkService} from '../../../d3/models/link.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-graph-details',
  styleUrls: ['graph-details.component.css'],
  template:
  `
<mat-tab-group selectedIndex="1">
  <mat-tab label="Link View">
    <link-list-visual></link-list-visual>
  </mat-tab>
  <mat-tab label="Node View">
    <node-details-visual></node-details-visual>
  </mat-tab>
</mat-tab-group>
`
})
export class GraphDetailsComponent {}

