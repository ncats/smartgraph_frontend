import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {LoadingService} from './services/loading.service';
import {NodeService} from './d3/models/node.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../assets/material/material.module';
import {LinkService} from './d3/models/link.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from './services/message.service';
import {ConfigService} from './services/config.service';
import { DataConnectionService } from './services/data-connection.service';

describe('AppComponent', () => {
  // Mock ConfigService
  const mockConfigService = {
    get: jasmine.createSpy('get').and.returnValue('ws://localhost:1234/socket')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
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
    }).compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  /*it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));*/
});
