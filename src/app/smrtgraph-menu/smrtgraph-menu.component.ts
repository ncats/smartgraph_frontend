import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'smrtgraph-menu',
  templateUrl: './smrtgraph-menu.component.html',
  styleUrls: ['./smrtgraph-menu.component.css']
})
export class SmrtgraphMenuComponent implements OnInit {
title:string = "smrtgraph";

  constructor(public settingsService: SettingsService) { }

  ngOnInit() {
  }

  navOpen() {
    this.settingsService.sidenav.toggle();
  }

}
