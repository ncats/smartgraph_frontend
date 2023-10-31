import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService]
    });

    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load configuration', () => {
    const mockConfig = {
      apiEndpoint: 'http://localhost:3000/api',
      someOtherConfig: 'value'
    };

    service.loadConfig().then((config: any) => {
      expect(config.apiEndpoint).toBe('http://localhost:3000/api');
      expect(config.someOtherConfig).toBe('value');
    });

    const req = httpMock.expectOne('/assets/config.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);
  });

  it('should return configuration value by key', () => {
    const mockConfig = {
      apiEndpoint: 'http://localhost:3000/api',
      someOtherConfig: 'value'
    };

    // Simulate loading of configuration
    service['config'] = mockConfig;

    const value = service.get('apiEndpoint');
    expect(value).toBe('http://localhost:3000/api');
  });
});