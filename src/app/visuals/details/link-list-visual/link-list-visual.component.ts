import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {LinkDataSource, LinkDatabase} from './link-database.service';

@Component({
  selector: 'link-list-visual',
  templateUrl: './link-list-visual.component.html',
  styleUrls: ['./link-list-visual.component.css']
})
export class LinkListVisualComponent implements OnInit {
  displayedColumns = ['source', 'linkType', 'target', 'details', 'reference', 'score'];
  dataSource: LinkDataSource | null;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private linkDatabase: LinkDatabase){
  }
  ngOnInit() {
    this.dataSource = new LinkDataSource(this.linkDatabase, this.sort);
  }
}
