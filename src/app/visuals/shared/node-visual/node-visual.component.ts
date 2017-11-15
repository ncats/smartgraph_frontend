import { Component, Input } from '@angular/core';
import { Node } from '../../../d3/models/node';
import {SettingsService} from "../../../services/settings.service";
import {Subscription} from "rxjs";

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          class="node {{node.labels[0]}}"
          [ngClass]="{startNode: node.params.startNode, endNode: node.params.endNode, hovering:node.params.hovered}"
          cx="0"
          cy="0"
          [attr.r]="node.r">
      </svg:circle>
     
<!--
       <svg:text *ngIf='node.r > 15 && node.linkCount >1' >{{node.genes || node.properties?.uniprot_id || node.properties?.hash}}</svg:text>
-->
       <svg:text>{{label}}</svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
label: string;
  subscription: Subscription;


  constructor(public settingsService:SettingsService){}

  ngOnInit():void{
    this.subscription = this.settingsService.dataChange
      .subscribe(settings => {
        switch(this.node.constructor.name) {
          case 'Target': {
            this.label = this.node[settings.targetLabel];
            break;
          }
          case 'Compound': {
            /*
             this.label = this.settingsService.settings.compoundLabel;
             */
            this.label = this.node.properties.hash;
            break;
          }
        }
      });
    }
}
