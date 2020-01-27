import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmrtgraphSearchComponent } from './smrtgraph-search.component';
import {LoadingService} from '../services/loading.service';
import {NodeService} from '../d3/models/node.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../assets/material/material.module';
import {LinkService} from '../d3/models/link.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from '../services/message.service';
import {NodeExpandService} from '../services/node-expand.service';
import {NodeMenuControllerService} from '../services/node-menu-controller.service';

describe('SmrtgraphSearchComponent', () => {
  let component: SmrtgraphSearchComponent;
  let fixture: ComponentFixture<SmrtgraphSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmrtgraphSearchComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        MessageService,
        NodeService,
        LinkService,
        LoadingService,
        NodeExpandService,
        NodeMenuControllerService
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmrtgraphSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
