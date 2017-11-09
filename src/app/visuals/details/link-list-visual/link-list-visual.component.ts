import {Component, OnInit, ViewChild} from '@angular/core';
import {LinkDataSource, LinkDatabase} from "./link-database.service";
import {MatSort} from "@angular/material";

@Component({
  selector: 'link-list-visual',
  templateUrl: './link-list-visual.component.html',
  styleUrls: ['./link-list-visual.component.css']
})
export class LinkListVisualComponent implements OnInit {
  displayedColumns = ['edgeType', 'sourceType', 'targetType'];
  dataSource: LinkDataSource | null;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private linkDatabase: LinkDatabase){
  }
  ngOnInit() {
    console.log(this);
    this.dataSource = new LinkDataSource(this.linkDatabase, this.sort);
  }
}
