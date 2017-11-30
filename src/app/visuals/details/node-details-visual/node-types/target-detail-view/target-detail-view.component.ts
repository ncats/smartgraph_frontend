import {Component, OnInit, Input} from '@angular/core';
import {Link} from '../../../../../d3/models/link';
import {Target} from '../../../../../d3/models/node';

@Component({
  selector: 'target-detail-view',
  templateUrl: 'target-detail-view.component.html',
  styleUrls: ['target-detail-view.component.css']
})
export class TargetDetailViewComponent implements OnInit {
  @Input()
  node: Target;


  uniprotUrl: string;

  constructor() {
  }

  ngOnInit() {
      //  this.uniprotUrl = "https://www.ebi.ac.uk/chembl/target/inspect/" + data.node.uniprot_id;
    }

  ngOnChanges(changes){
    //  this.uniprotUrl = "https://www.ebi.ac.uk/chembl/target/inspect/" + data.node.uniprot_id;
  }
}
