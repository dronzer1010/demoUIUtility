import { TestBed } from '@angular/core/testing';

import { RuleserviceService } from './ruleservice.service';

describe('RuleserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuleserviceService = TestBed.get(RuleserviceService);
    expect(service).toBeTruthy();
  });
});
