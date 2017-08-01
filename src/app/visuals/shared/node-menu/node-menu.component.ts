import {Component, OnInit, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {NodeService} from "../../../d3/models/node.service";
import {Subscription} from "rxjs";
import {Message, MessageService} from "../../../services/message.service";
import {DataService} from "../../../services/data.service";
import {NodeMenuControllerService} from "../../../services/node-menu-controller.service";
import {HistoryService} from "../../../services/history.service";

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
 <button md-menu-item *ngIf="!expanded.target"(click)="expand('Target')" [disabled]="!counts.target">Expand Targets {{counts?.target}}</button>
 <button md-menu-item *ngIf="expanded.target"(click)="collapse('Target')" [disabled]="!counts.target">Collapse Targets {{counts?.target}}</button>
 <button md-menu-item (click)="expand('Compound')" [disabled]="!counts.lychi">Expand Compounds {{counts?.lychi}}</button>
 <button md-menu-item (click)="expand('Pattern')" [disabled]="!counts.pattern">Expand Patterns {{counts?.pattern}}</button>
 <button md-menu-item (click)="expand('All')">Expand All {{counts?.total}}</button>
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
  expanded: Object ={
    target:false,
  lychi: false,
  pattern: false
  };

 constructor(
   private nodeService:NodeService,
  private dataService:DataService,
  private messageService: MessageService,
   private nodeMenuController : NodeMenuControllerService,
   private historyService: HistoryService
 ) {
   this.subscription = this.nodeService.clickednode$
     .subscribe(node => {
       this.clickedNode = node;
       if(this.clickedNode.id) {
         this.counts={total:0};
         console.log(this.clickedNode);
         let message: Message = this.messageService.getMessage(this.clickedNode.id, "counts");
         this.dataService.messages.next(message);

         // this.getSmiles(node);
       }
     });

   this.dataService.messages.subscribe(msg => {
     let response = JSON.parse(msg);
     if(this.clickedNode.id && response.type =="counts") {
       this.counts[response.data._fields[0][0].toLowerCase()] = response.data._fields[1].low;
       this.counts.total = this.counts.total + response.data._fields[1].low;
     }
   });

   this.menuSubscription = this.nodeMenuController.clickedmenu$.subscribe(res =>{
     console.log(this);
     this.menuToggle = res;
   })
 }


  ngOnInit() {
  }

  expand(label){
    let message: Message = this.messageService.getMessage(this.clickedNode.id, "nodeclick", label);
    this.dataService.messages.next(message);
    this.expanded[label.toLowerCase()]= true;
  }

  collapse(label){
    console.log(label);
    this.historyService.nodeCollapse(this.clickedNode, label);
    this.expanded[label.toLowerCase()]= false;
  }
}
