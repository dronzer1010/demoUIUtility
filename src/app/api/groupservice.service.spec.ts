import { TestBed } from '@angular/core/testing';

import { GroupserviceService } from './groupservice.service';

describe('GroupserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupserviceService = TestBed.get(GroupserviceService);
    expect(service).toBeTruthy();
  });
});
