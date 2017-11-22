import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-smrtgraph-settings',
  templateUrl: './smrtgraph-settings.component.html',
  styleUrls: ['./smrtgraph-settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SmrtgraphSettingsComponent implements OnInit {
  targetLabelCtrl: FormControl;
  compoundLabelCtrl: FormControl;
  patternLabelCtrl: FormControl;
  showLinkLabelCtrl: FormControl;

  constructor(public settingsService: SettingsService) {
    this.targetLabelCtrl = new FormControl();
    this.compoundLabelCtrl = new FormControl();
    this.patternLabelCtrl = new FormControl();
    this.showLinkLabelCtrl = new FormControl();
  }

  ngOnInit() {
    this.targetLabelCtrl.valueChanges.subscribe(value => {
      this.settingsService.settings.targetLabel = value;
    this.settingsService.dataChange.next(this.settingsService.settings);
    });
    this.compoundLabelCtrl.valueChanges.subscribe(value => {
      this.settingsService.settings.compoundLabel = value;
    this.settingsService.dataChange.next(this.settingsService.settings);
    });
    this.patternLabelCtrl.valueChanges.subscribe(value => {
      if (value === true) {
        this.settingsService.settings.patternLabel = 'structure';
      }else {
        this.settingsService.settings.patternLabel = value;
      }
       this.settingsService.dataChange.next(this.settingsService.settings);
    });
    this.showLinkLabelCtrl.valueChanges.subscribe(value => {
      this.settingsService.settings.showLinkLabel = value;
      this.settingsService.dataChange.next(this.settingsService.settings);
    });
  }

}
