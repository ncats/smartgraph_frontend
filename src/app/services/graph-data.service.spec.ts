import { TestBed, inject } from '@angular/core/testing';

import { GraphDataService } from './graph-data.service';
import {MessageService} from './message.service';
import {NodeService} from '../d3/models/node.service';
import {LinkService} from '../d3/models/link.service';
import {LoadingService} from './loading.service';
import { ConfigService } from './config.service';
import { DataConnectionService } from './data-connection.service';

describe('GraphDataService', () => {

  // Mock ConfigService
  const mockConfigService = {
    get: jasmine.createSpy('get').and.returnValue('ws://localhost:1234/socket')
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: mockConfigService },  // Provide the mock
        DataConnectionService,
        GraphDataService,
        MessageService,
        NodeService,
        LinkService,
        LoadingService
      ]
    });
  });

  it('should be created', inject([GraphDataService], (service: GraphDataService) => {
    expect(service).toBeTruthy();
  }));
});
