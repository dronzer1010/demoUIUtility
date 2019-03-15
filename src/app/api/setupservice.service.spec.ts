import { TestBed } from '@angular/core/testing';

import { SetupserviceService } from './setupservice.service';

describe('SetupserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetupserviceService = TestBed.get(SetupserviceService);
    expect(service).toBeTruthy();
  });
});
