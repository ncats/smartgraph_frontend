import { TestBed, inject } from '@angular/core/testing';

import { SettingsToggleService } from './settings.service';

describe('SettingsToggleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsToggleService]
    });
  });

  it('should be created', inject([SettingsToggleService], (service: SettingsToggleService) => {
    expect(service).toBeTruthy();
  }));
});
