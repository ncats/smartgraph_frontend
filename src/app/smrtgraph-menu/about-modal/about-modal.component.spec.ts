import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoadingService} from '../../services/loading.service';
import {NodeService} from '../../d3/models/node.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../assets/material/material.module';
import {LinkService} from '../../d3/models/link.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from '../../services/message.service';
import {DisclaimerModalComponent} from '../../smrtgraph-settings/disclaimer-modal/disclaimer-modal.component';
import { ConfigService } from 'src/app/services/config.service';

describe('DisclaimerModalComponent', () => {
  let component: DisclaimerModalComponent;
  let fixture: ComponentFixture<DisclaimerModalComponent>;

  // Mock ConfigService
  const mockConfigService = {
    get: jasmine.createSpy('get').and.returnValue('http://localhost:5007')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclaimerModalComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },  // Provide the mock
        MessageService,
        NodeService,
        LinkService,
        LoadingService
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclaimerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
