import { TestBed, inject } from '@angular/core/testing';

import { LinkDatabaseService } from './link-database.service';

describe('LinkDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkDatabaseService]
    });
  });

  it('should be created', inject([LinkDatabaseService], (service: LinkDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
