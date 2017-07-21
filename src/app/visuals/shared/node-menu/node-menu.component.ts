import {Component, OnInit, Input} from '@angular/core';
import {NodeService} from "../../../d3/models/node.service";
import {Subscription} from "rxjs";

@Component({
  selector: '[nodeMenu]',
  template: `
 <svg:foreignObject class="node" [attr.x]="clickedNode.x" [attr.y]="clickedNode.y" width="100" height="100"
 [attr.transform]="'translate(' + clickedNode.x + ',' + clickedNode.y + ')'">
 <xhtml:div>
 <xhtml:ul class="custom-menu">
 <li (click) = "test()">{{clickedNode.id}} thing</li>
 <li data-action = "second">Second thing</li>
 <li data-action = "third">Third thing</li>
 </xhtml:ul>
 </xhtml:div>
 </svg:foreignObject>
<!--
<svg class="node-menu" [attr.x]="clickedNode.x" [attr.y]="clickedNode.y"></svg>
-->
`,
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuComponent implements OnInit {

  clickedNode: any ={x:0, y:0};
  subscription:Subscription;
  constructor(private nodeService:NodeService,
  ) { }

  ngOnInit() {
    console.log("menu created");
    console.log(this.clickedNode);
    this.subscription = this.nodeService.clickednode$
      .subscribe(node => {
        console.log(node);
         this.clickedNode = node;

        // this.getSmiles(node);

      });

  }

  test(){
    console.log("test");
  }
}
