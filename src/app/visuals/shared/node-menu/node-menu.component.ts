import {Component, OnInit, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {NodeService} from "../../../d3/models/node.service";
import {Subscription} from "rxjs";
import {Message, MessageService} from "../../../services/message.service";
import {DataConnectionService} from "../../../services/data-connection.service";
import {NodeMenuControllerService} from "../../../services/node-menu-controller.service";
import {GraphDataService} from "../../../services/graph-data.service";

@Component({
  selector: '[nodeMenu]',
  template: `
 <svg:g menu-list></svg:g>
`,
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuHolderComponent{}

@Component({
  selector: '[menu-list]',
  template: `
<svg:foreignObject class="node-menu" [attr.x]="clickedNode.x" [attr.y]="clickedNode.y" width="250" height="300" *ngIf="menuToggle" >
 <xhtml:div xmlns="http://www.w3.org/1999/xhtml">
 <md-list class="node-menu">
<button  md-menu-item *ngIf="clickedNode.properties?.chembl_id" [disabled] = "true"><b>{{clickedNode.properties?.chembl_id}}</b></button>
 <button md-menu-item *ngIf="!clickedNode.expanded.target" (click)="expand('Target')" [disabled]="!counts.target">Expand Targets {{counts?.target}}</button>
 <button md-menu-item *ngIf="clickedNode.expanded.target" (click)="collapse('Target')" [disabled]="!counts.target">Collapse Targets {{counts?.target}}</button>
 <button md-menu-item *ngIf="!clickedNode.expanded.lychi" (click)="expand('Lychi')" [disabled]="!counts.lychi">Expand Compounds {{counts?.lychi}}</button>
  <button md-menu-item *ngIf="clickedNode.expanded.lychi" (click)="collapse('Lychi')" [disabled]="!counts.lychi">Collapse Compounds {{counts?.lychi}}</button>
 <button md-menu-item *ngIf="!clickedNode.expanded.pattern" (click)="expand('Pattern')" [disabled]="!counts.pattern">Expand Patterns {{counts?.pattern}}</button>
  <button md-menu-item *ngIf="clickedNode.expanded.pattern" (click)="collapse('Pattern')" [disabled]="!counts.pattern">Collapse Patterns {{counts?.pattern}}</button>
 <button md-menu-item (click)="expand('All')">Expand All {{counts?.total}}</button>
<!--
//todo: collapse all show/hide logic
 <button md-menu-item (click)="collapse('All')">Collapse All</button>
-->
</md-list>
 
</xhtml:div>
 </svg:foreignObject>
`,
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuComponent{
  clickedNode: any ={x:0, y:0};
  subscription:Subscription;
  menuSubscription:Subscription;
  menuToggle:boolean= false;
  counts: any ={total:0};

 constructor(
   private nodeService:NodeService,
  private dataConnectionService:DataConnectionService,
  private messageService: MessageService,
   private nodeMenuController : NodeMenuControllerService,
   private graphDataService: GraphDataService
 ) {
   //this only gets the count of the nodes
   this.subscription = this.nodeService.clickednode$
     .subscribe(node => {
       this.clickedNode = node;
       if(this.clickedNode.id) {
         this.counts={total:0};
         let message: Message = this.messageService.getMessage(this.clickedNode.id, "counts");
         this.dataConnectionService.messages.next(message);
         // this.getSmiles(node);
       }
     });

   this.dataConnectionService.messages.subscribe(msg => {
     let response = JSON.parse(msg);
     if(this.clickedNode.id && response.type =="counts") {
       this.counts[response.data._fields[0][0].toLowerCase()] = response.data._fields[1].low;
       this.counts.total = this.counts.total + response.data._fields[1].low;
     }
   });

   this.menuSubscription = this.nodeMenuController.clickedmenu$.subscribe(res =>{
     this.menuToggle = res;
   })
 }


  ngOnInit() {
  }

  expand(label):void{
   this.graphDataService.nodeExpand(this.clickedNode.id, label);
//todo: this option is not node specific -- change to map
    this.clickedNode.expanded[label.toLowerCase()]= true;
  }

  collapse(label):void{
    this.graphDataService.nodeCollapse(this.clickedNode, {event: label, node: this.clickedNode.id});
//todo: this option is not node specific -- change to map
    this.clickedNode.expanded[label.toLowerCase()]= false;
  }
}
