import {Component, OnInit, Input} from '@angular/core';
import {Pattern} from '../../../../../d3/models/node';
import {Link} from '../../../../../d3/models/link';

@Component({
  selector: 'pattern-detail-view',
  templateUrl: 'pattern-detail-view.component.html',
  styleUrls: ['pattern-detail-view.component.css']
})
export class PatternDetailViewComponent implements OnInit {
  @Input()
  node: Pattern;
  nodeSmiles: string;

  constructor() {
  }

  ngOnInit() {
   }
}
