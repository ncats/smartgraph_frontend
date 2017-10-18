import {Component, Input} from '@angular/core';
import { Link } from '../../../d3/models/link';
import { Node } from '../../../d3/models/node';


@Component({
  selector: '[linkVisual]',
  template: `
 <svg:g>  

      </svg:g>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: Link;
 // source:Node;
 // target:Node;
  constructor() {
  }

  ngOnInit() {
  }

  endpointLessRadius(link, attr_name) { // subtract radius away from line end
   // this.source = link.source;
  //  this.target = link.target;
    let x1 =  link.source.x || 0;
    let y1 =  link.source.y || 0;
    let x2 =  link.target.x || 0;
    let y2 =  link.target.y || 0;

    let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    let radius1 =  link.source.r || 0;
    let radius2 =  link.target.r || 0;

    if (attr_name === 'x1') return x1 + (x2 - x1) * radius1 / distance;
    if (attr_name === 'y1') return y1 + (y2 - y1) * radius1 / distance;
    if (attr_name === 'x2') return x2 + (x1 - x2) * radius2 / distance;
    if (attr_name === 'y2') return y2 + (y1 - y2) * radius2 / distance;
  }

}
