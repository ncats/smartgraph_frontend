import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from "@angular/forms";
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'smrtgraph-settings',
  templateUrl: './smrtgraph-settings.component.html',
  styleUrls: ['./smrtgraph-settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SmrtgraphSettingsComponent implements OnInit {
  targetLabelCtrl: FormControl;
  patternCtrl: FormControl;
  constructor(public settingsService: SettingsService) {
    this.targetLabelCtrl = new FormControl();

  }

  ngOnInit() {
    this.targetLabelCtrl.valueChanges.subscribe(value => {this.settingsService.settings.targetLabel = value; this.settingsService.dataChange.next(this.settingsService.settings)})
  }

}
