import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeMenuComponent } from './node-menu.component';
import {LoadingService} from '../../../services/loading.service';
import {NodeService} from '../../../d3/models/node.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../assets/material/material.module';
import {LinkService} from '../../../d3/models/link.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from '../../../services/message.service';
import {NodeMenuControllerService} from '../../../services/node-menu-controller.service';
import {NodeExpandService} from '../../../services/node-expand.service';

describe('NodeMenuComponent', () => {
  let component: NodeMenuComponent;
  let fixture: ComponentFixture<NodeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeMenuComponent ],
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
    fixture = TestBed.createComponent(NodeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
