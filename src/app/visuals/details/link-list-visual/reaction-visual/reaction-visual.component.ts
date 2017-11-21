import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Reaction} from '../../../../d3/models/link';

@Component({
  selector: 'reaction-visual',
  templateUrl: './reaction-visual.component.html',
  styleUrls: ['./reaction-visual.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReactionVisualComponent implements OnInit {
  @Input() reactions: string;

  constructor() { }

  ngOnInit() {
  }

}
