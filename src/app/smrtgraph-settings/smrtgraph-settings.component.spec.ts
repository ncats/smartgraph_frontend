import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmrtgraphSettingsComponent } from './smrtgraph-settings.component';
import {LoadingService} from '../services/loading.service';
import {NodeService} from '../d3/models/node.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../assets/material/material.module';
import {LinkService} from '../d3/models/link.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from '../services/message.service';

describe('SmrtgraphSettingsComponent', () => {
  let component: SmrtgraphSettingsComponent;
  let fixture: ComponentFixture<SmrtgraphSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmrtgraphSettingsComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        MessageService,
        NodeService,
        LinkService,
        LoadingService
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmrtgraphSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
