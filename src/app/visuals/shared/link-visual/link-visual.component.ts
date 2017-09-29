import {Component, Input} from '@angular/core';
import {Link, Node} from '../../../d3';


@Component({
  selector: '[linkVisual]',
  template: `
 <svg:g>  
        <svg:line class="link arrow"
    [attr.x1]="endpointLessRadius(link, 'x1') || 0"
    [attr.y1]="endpointLessRadius(link, 'y1') || 0"
    [attr.x2]="endpointLessRadius(link, 'x2') || 0"
    [attr.y2]="endpointLessRadius(link, 'y2') || 0">
</svg:line>
    <svg:text class="link-name"
        [attr.font-size]= 10
        [attr.x]="(source.x +target.x)/2 "
        [attr.y]="(source.y +target.y)/2 ">
        {{link.id}}
        {{link.properties?.median_p_activity || link.properties?.effect}}
      </svg:text>
      </svg:g>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: Link;

  source:Node;
  target:Node;
  constructor() {
  }

  ngOnInit() {
  }


  endpointLessRadius(link, attr_name) { // subtract radius away from line end
    this.source = link.source;
    this.target = link.target;
    let x1 =  this.source.x;
    let y1 =  this.source.y;
    let x2 =  this.target.x;
    let y2 =  this.target.y;

    let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    let radius1 =  this.source.r || 0;
    let radius2 =  this.target.r || 0;

    if (attr_name === 'x1') return x1 + (x2 - x1) * radius1 / distance;
    if (attr_name === 'y1') return y1 + (y2 - y1) * radius1 / distance;
    if (attr_name === 'x2') return x2 + (x1 - x2) * radius2 / distance;
    if (attr_name === 'y2') return y2 + (y1 - y2) * radius2 / distance;
  }

}
