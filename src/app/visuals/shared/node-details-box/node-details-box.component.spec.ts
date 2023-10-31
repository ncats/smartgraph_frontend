import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDetailsBoxComponent } from './node-details-box.component';
import {LoadingService} from '../../../services/loading.service';
import {NodeService} from '../../../d3/models/node.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../assets/material/material.module';
import {LinkService} from '../../../d3/models/link.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from '../../../services/message.service';
import {D3Service} from '../../../d3/d3.service';
import {NodeMenuControllerService} from '../../../services/node-menu-controller.service';
import {NodeExpandService} from '../../../services/node-expand.service';
import { ConfigService } from 'src/app/services/config.service';
import { DataConnectionService } from 'src/app/services/data-connection.service';

describe('NodeDetailsBoxComponent', () => {
  let component: NodeDetailsBoxComponent;
  let fixture: ComponentFixture<NodeDetailsBoxComponent>;
  
  // Mock ConfigService
  const mockConfigService = {
    get: jasmine.createSpy('get').and.returnValue('ws://localhost:1234/socket')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDetailsBoxComponent ],
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
        LoadingService,
        D3Service,
        NodeMenuControllerService,
        NodeExpandService
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
