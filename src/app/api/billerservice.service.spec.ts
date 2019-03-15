import { TestBed } from '@angular/core/testing';

import { BillerserviceService } from './billerservice.service';

describe('BillerserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillerserviceService = TestBed.get(BillerserviceService);
    expect(service).toBeTruthy();
  });
});
