import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {AboutModalComponent} from "./about-modal/about-modal.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'smrtgraph-menu',
  templateUrl: './smrtgraph-menu.component.html',
  styleUrls: ['./smrtgraph-menu.component.css']
})
export class SmrtgraphMenuComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public settingsService: SettingsService) { }

  ngOnInit() {
  }

  navOpen() {
    this.settingsService.sidenav.toggle();
  }

  aboutOpen() {
    const dialogRef = this.dialog.open(AboutModalComponent, {
      width: '50vw'
    });
  }

}
