import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SettingsService} from '../services/settings.service';
import {DisclaimerModalComponent} from './disclaimer-modal/disclaimer-modal.component';

@Component({
  selector: 'app-smrtgraph-settings',
  templateUrl: './smrtgraph-settings.component.html',
  styleUrls: ['./smrtgraph-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmrtgraphSettingsComponent implements OnInit {
  targetLabelCtrl: UntypedFormControl;
  compoundLabelCtrl: UntypedFormControl;
  patternLabelCtrl: UntypedFormControl;
  showLinkLabelCtrl: UntypedFormControl;

  constructor(
    public dialog: MatDialog,
    public settingsService: SettingsService) {
    this.targetLabelCtrl = new UntypedFormControl();
    this.compoundLabelCtrl = new UntypedFormControl();
    this.patternLabelCtrl = new UntypedFormControl();
    this.showLinkLabelCtrl = new UntypedFormControl();
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
      } else {
        this.settingsService.settings.patternLabel = value;
      }
       this.settingsService.dataChange.next(this.settingsService.settings);
    });
    this.showLinkLabelCtrl.valueChanges.subscribe(value => {
      this.settingsService.settings.showLinkLabel = value;
      this.settingsService.dataChange.next(this.settingsService.settings);
    });
  }

  openDisclaimer() {
      const dialogRef = this.dialog.open(DisclaimerModalComponent, {
        width: '50vw'
      });
  }
}
