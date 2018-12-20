import {Component, Input} from '@angular/core';
import { Link } from '../../../d3/models/link';
import { Node } from '../../../d3/models/node';
import {Subscription} from 'rxjs';
import {SettingsService} from '../../../services/settings.service';


@Component({
  selector: '[linkVisual]',
  template: `
    <svg:g class ="link-group">
      <svg:line class="link end"
                [ngClass]="{arrow: link.edgeType != 'down', flatarrow: link.edgeType === 'down'}"
                [attr.x1]="endpointLessRadius(link, 'x1') || 0"
                [attr.y1]="endpointLessRadius(link, 'y1') || 0"
                [attr.x2]="endpointLessRadius(link, 'x2') || 0"
                [attr.y2]="endpointLessRadius(link, 'y2') || 0"
      />
      <svg:text class="link-name" *ngIf="showLinkLabel"
                [attr.font-size]= 10
                [attr.x]="(link.source?.x + link.target?.x)/2 "
                [attr.y]="(link.source?.y + link.target?.y)/2 "
      >
        {{link?.type }}
      </svg:text>
      <svg:line class="clickable-area"
                [attr.x1]= "getSource(link?.source,'x')"
                [attr.y1]= "getSource(link?.source,'y')"
                [attr.x2]= "getSource(link?.target,'x')"
                [attr.y2]= "getSource(link?.target,'y')"
      />
    </svg:g>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: Link;
  showLinkLabel: boolean;
  subscription: Subscription;

  constructor( private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.subscription = this.settingsService.dataChange
      .subscribe(settings => {
        this.showLinkLabel = settings.showLinkLabel;
      });

  }

  getSource(link: Node, property: string): number{
    if(link[property]){
      return link[property];
    } else {
      return 0;
    }
  }

  endpointLessRadius(link, attr_name) { //  subtract radius away from line end
    //  this.source = link.source;
    //   this.target = link.target;
    const x1 =  link.source.x || 0;
    const y1 =  link.source.y || 0;
    const x2 =  link.target.x || 0;
    const y2 =  link.target.y || 0;

    const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    const radius1 =  link.source.r || 0;
    const radius2 =  link.target.r || 0;

    if (attr_name === 'x1') return x1 + (x2 - x1) * radius1 / distance;
    if (attr_name === 'y1') return y1 + (y2 - y1) * radius1 / distance;
    if (attr_name === 'x2') return x2 + (x1 - x2) * radius2 / distance;
    if (attr_name === 'y2') return y2 + (y1 - y2) * radius2 / distance;
  }

}
