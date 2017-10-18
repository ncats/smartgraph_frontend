import { Component, Input } from '@angular/core';
import { Node } from '../../../d3/models/node';

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
               *ngIf='node.labels[0] != "Pattern"'

     <svg:circle *ngIf='node.labels[0] === "Pattern"'>
      <svg:foreignObject  width='100' height='100' [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
 <xhtml:div xmlns="http://www.w3.org/1999/xhtml">
<tooltip-visual [node]="node"></tooltip-visual> 
</xhtml:div>
      </svg:foreignObject>
      </svg:circle>-->
<!--
       <svg:text>{{node.properties?.uniprot_id}}</svg:text>
-->
       
       <svg:text>{{node.properties?.uniprot_id || node.properties?.hash}}</svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
}
