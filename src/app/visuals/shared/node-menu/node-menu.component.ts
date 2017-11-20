import {Component} from '@angular/core';
import {NodeService} from "../../../d3/models/node.service";
import {Subscription} from "rxjs/Subscription";
import {Message, MessageService} from "../../../services/message.service";
import {DataConnectionService} from "../../../services/data-connection.service";
import {NodeMenuControllerService} from "../../../services/node-menu-controller.service";
import {GraphDataService} from "../../../services/graph-data.service";
import {SettingsService} from "../../../services/settings.service";

@Component({
  selector: '[menu-list]',
  template: `
<svg:foreignObject class="node-menu" [attr.x]="clickedNode.x" [attr.y]="clickedNode.y" width="20vh" height="20vh" *ngIf="clickedNode.params.menu" >
 <xhtml:div xmlns="http://www.w3.org/1999/xhtml">
  <mat-list>
    <button  mat-menu-item class = "expand-list" [disabled] = "true"><b>{{label}}</b></button>
    <button mat-menu-item class = "expand-list" *ngIf="!clickedNode.expanded.target" (click)="expand('Target')" [disabled]="!counts.target">Expand Targets {{counts?.target}}</button>
    <button mat-menu-item class = "expand-list" *ngIf="clickedNode.expanded.target" (click)="collapse('Target')" [disabled]="!counts.target">Collapse Targets {{counts?.target}}</button>
    <button mat-menu-item class = "expand-list"  *ngIf="!clickedNode.expanded.compound" (click)="expand('Compound')" [disabled]="!counts.compound">Expand Compounds {{counts?.compound}}</button>
    <button mat-menu-item class = "expand-list" *ngIf="clickedNode.expanded.compound" (click)="collapse('Compound')" [disabled]="!counts.compound">Collapse Compounds {{counts?.compound}}</button>
    <button mat-menu-item class = "expand-list" *ngIf="!clickedNode.expanded.pattern" (click)="expand('Pattern')" [disabled]="!counts.pattern">Expand Patterns {{counts?.pattern}}</button>
    <button mat-menu-item class = "expand-list" *ngIf="clickedNode.expanded.pattern" (click)="collapse('Pattern')" [disabled]="!counts.pattern">Collapse Patterns {{counts?.pattern}}</button>
    <button mat-menu-item class = "expand-list" (click)="expand('All')">Expand All {{counts?.total}}</button>
<!--
//todo: collapse all show/hide logic
 <button mat-menu-item (click)="collapse('All')">Collapse All</button>
-->
  </mat-list>
</xhtml:div>
</svg:foreignObject>
`,
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuComponent{
  clickedNode: any ={x:0, y:0, params:{menu: false}};
  counts: any ={total:0};
  label: string;

 constructor(
   private nodeService:NodeService,
  private dataConnectionService:DataConnectionService,
  private messageService: MessageService,
   private nodeMenuController : NodeMenuControllerService,
   private graphDataService: GraphDataService,
   private settingsService: SettingsService
 ) {
   //this only gets the count of the nodes
 this.nodeService.clickednode$.subscribe(node => {
       this.clickedNode = node;
       if(this.clickedNode.id) {
         this.counts={total:0};
         let message: Message = this.messageService.getMessage(this.clickedNode.id, "counts", this.clickedNode.labels[0]);
         this.dataConnectionService.messages.next(message);
       }
     });

   this.dataConnectionService.messages.subscribe(msg => {
     let response = JSON.parse(msg);
     if(this.clickedNode.id && response.type =="counts") {
       this.counts[response.data._fields[0][0].toLowerCase()] = response.data._fields[1].low;
       this.counts.total = this.counts.total + response.data._fields[1].low;
     }
   });

 this.nodeMenuController.clickedmenu$.subscribe(res =>{
     this.clickedNode.params.menu = res;
   })
 }


  ngOnInit() {
  }

  expand(label):void{
   console.log(label);
   let params = {
     "origin": this.clickedNode.labels[0],
     "target": label
   };
   this.graphDataService.nodeExpand(this.clickedNode.id, params);
//todo: this option is not node specific -- change to map
    this.clickedNode.expanded[label.toLowerCase()]= true;
    this.nodeMenuController.toggleVisible(false);
    this.clickedNode.params.menu = false;
  }

  collapse(label):void{
   console.log(label);
    this.graphDataService.nodeCollapse(this.clickedNode, {event: label, node: this.clickedNode.id});
//todo: this option is not node specific -- change to map
    this.clickedNode.expanded[label.toLowerCase()]= false;
    this.nodeMenuController.toggleVisible(false);
    this.clickedNode.params.menu = false;
  }
}
