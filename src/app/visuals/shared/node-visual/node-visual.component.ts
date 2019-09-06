import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Node, Pattern, Compound} from '../../../d3/models/node';
import {SettingsService} from '../../../services/settings.service';
import {NodeMenuControllerService} from "../../../services/node-menu-controller.service";
import {NodeService} from "../../../d3/models/node.service";

@Component({
  selector: 'structure-view',
  styleUrls: ['./node-visual.component.scss'],
  template: `
    <img class="structureImage {{data.labels[0]}}" [src] = data.imageUrl>
`
})

export class StructureViewer{
@Input() data: Compound | Pattern;
}

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'"  *ngIf="label !='structure'" (click)="toggleMenu($event)" >
      <svg:circle
          class="node {{node.labels[0]}} node-child"
          [ngClass]="{startNode: node.params.startNode, endNode: node.params.endNode, clicked: nodeClicked}"
          cx="0"
          cy="0"
          [attr.r]="node.r">
      </svg:circle>
       <svg:text class ="node-text">{{label}}</svg:text>
       </svg:g>
        <svg:foreignObject [attr.width]="node.r * 2.1" [attr.height]="node.r *2.1" *ngIf="label ==='structure'" [attr.x]="node.x - (node.r+.5*node.r)" [attr.y]="node.y -(node.r+.5*node.r)">
 <xhtml:div xmlns="http:// www.w3.org/1999/xhtml">
    <structure-view [data]="node"></structure-view>
</xhtml:div>
      </svg:foreignObject>

  `,
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input('nodeVisual')node: Node;
  label: string;
  nodeClicked = false;

  constructor(public settingsService: SettingsService,
              private nodeService: NodeService,
              private nodeMenuController: NodeMenuControllerService,
              private ref: ChangeDetectorRef
              ){}

  ngOnInit(): void{
    this.settingsService.dataChange
      .subscribe(settings => {
       // console.log(settings);
        switch (this.node._type) {
          case 'target': {
            this.label = this.node[settings.targetLabel];
            break;
          }
          case 'compound': {
            if (settings.compoundLabel === 'structure') {
             this.label = settings.compoundLabel;
                } else {
              this.label = this.node['hash'];
            }
            this.ref.markForCheck();
            break;
          }
          case 'pattern': {
              this.label = settings.patternLabel ? settings.patternLabel : "";
            break;
          }
        }
     //   console.log(this.label);
      });
    }

    toggleMenu(event) {
      // this is the only place where the menu is opened
      this.nodeClicked = !this.nodeClicked;
      this.nodeService.clickedNodes(this.node);
      this.nodeMenuController.toggleVisible(this.node.uuid);
    }

}



