import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {Link} from "../../../d3/models/link";
import {Node} from "../../../d3/models/node";
import {LinkService} from "../../../d3/models/link.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'link-list-visual',
  templateUrl: './link-list-visual.component.html',
  styleUrls: ['./link-list-visual.component.css']
})
export class LinkListVisualComponent implements OnInit , AfterViewInit {
  displayedColumns = ['source', 'linkType', 'target', 'details', 'reference', 'score', 'confidence'];
  linkSubscription: Subscription;
  data :  Link[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private linkService: LinkService){
  }
  ngOnInit() {
   this.linkSubscription = this.linkService.linkslist$
      .subscribe(res => {
        this.dataSource.data = Array.from(new Set(res.hovered.concat(res.clicked)));
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getNodeType(node: Node): string {
    return node._type;
  }
}
