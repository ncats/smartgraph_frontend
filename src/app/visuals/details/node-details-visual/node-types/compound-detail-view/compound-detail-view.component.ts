import {Component, OnInit, Input} from '@angular/core';
import {Compound} from '../../../../../d3/models/node';
import {Link} from '../../../../../d3/models/link';


@Component({
  selector: 'compound-detail-view',
  templateUrl: 'compound-detail-view.component.html',
  styleUrls: ['compound-detail-view.component.css']
})
export class CompoundDetailViewComponent implements OnInit {
@Input()
node: Compound;

  constructor() {
  }

  ngOnInit() {
  }

}
