import { TestBed } from '@angular/core/testing';

import { OrgserviceService } from './orgservice.service';

describe('OrgserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrgserviceService = TestBed.get(OrgserviceService);
    expect(service).toBeTruthy();
  });
});
