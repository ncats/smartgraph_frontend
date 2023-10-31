import { TestBed, inject } from '@angular/core/testing';
import { DataConnectionService } from './data-connection.service';
import { ConfigService } from './config.service';  // Assuming the path is correct

describe('DataConnectionService', () => {

  // Mock ConfigService
  const mockConfigService = {
    get: jasmine.createSpy('get').and.returnValue('ws://localhost:1234/socket')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataConnectionService,
        { provide: ConfigService, useValue: mockConfigService }  // Provide the mock
      ]
    });
  });

  it('should ...', inject([DataConnectionService], (service: DataConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
