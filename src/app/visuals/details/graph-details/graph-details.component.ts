import {Component} from '@angular/core';


@Component({
  selector: 'app-graph-details',
  styleUrls: ['graph-details.component.css'],
  template:
  `
<mat-tab-group>
  <mat-tab label="Link View">
    <link-list-visual></link-list-visual>
  </mat-tab>
  <mat-tab label="Clicked Nodes">
    <node-details-visual></node-details-visual>
  </mat-tab>
</mat-tab-group>
`
})
export class GraphDetailsComponent {}

