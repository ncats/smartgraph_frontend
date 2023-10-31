import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {HighlightPipe} from './highlight.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {LinkService} from '../../../d3/models/link.service';
import {NodeService} from '../../../d3/models/node.service';
import {MessageService} from '../../../services/message.service';
import {LoadingService} from '../../../services/loading.service';
import {MaterialModule} from '../../../../assets/material/material.module';
import { ConfigService } from 'src/app/services/config.service';
import { DataConnectionService } from 'src/app/services/data-connection.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  // Mock ConfigService
  const mockConfigService = {
    get: jasmine.createSpy('get').and.returnValue('ws://localhost:1234/socket')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
      ],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },  // Provide the mock
        DataConnectionService,
        MessageService,
        NodeService,
        LinkService,
        LoadingService
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        SearchComponent,
        HighlightPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
