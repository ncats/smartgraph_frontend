import { Component, Input } from '@angular/core';
import { Link } from '../../../d3';
import * as d3 from 'd3';


@Component({
  selector: '[linkVisual]',
  template: `
 <svg:g>
<!--    <svg:line
        class="link arrow"
                [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y"


    ></svg:line>-->
        
        <svg:line
        class="link arrow"
      [attr.x1]="endpointLessRadius(link, 'x1') || 0"
    [attr.y1]="endpointLessRadius(link, 'y1') || 0"
    [attr.x2]="endpointLessRadius(link, 'x2') || 0"
    [attr.y2]="endpointLessRadius(link, 'y2') || 0"
        ></svg:line>
    <svg:text
          class="link-name"
        [attr.font-size]= 10
        [attr.x]="(link.source.x +link.target.x)/2 "
        [attr.y]="(link.source.y +link.target.y)/2 "
        >
        {{link.properties?.median_p_activity || link.properties?.effect}}
      </svg:text>
      </svg:g>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent  {
  @Input('linkVisual') link: Link;

  constructor(){}

  ngOnInit() {
  }



  endpointLessRadius(link, attr_name) { // subtract radius away from line end
  let x1 = link.source.x;
  let y1 = link.source.y;
  let x2 = link.target.x;
  let y2 = link.target.y;

  let distance = Math.sqrt( Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2) );
  let radius1 = link.source.r || 0;
  let radius2 = link.target.r || 0;

  if( attr_name === 'x1' ) return x1 + (x2-x1) * radius1/distance;
  if( attr_name === 'y1' ) return y1 + (y2-y1) * radius1/distance;
  if( attr_name === 'x2' ) return x2 + (x1-x2) * radius2/distance;
  if( attr_name === 'y2' ) return y2 + (y1-y2) * radius2/distance;
}

}
