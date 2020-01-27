import { TestBed, inject } from '@angular/core/testing';

import { GraphDataService } from './graph-data.service';
import {MessageService} from './message.service';
import {NodeService} from '../d3/models/node.service';
import {LinkService} from '../d3/models/link.service';
import {LoadingService} from './loading.service';

describe('GraphDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
