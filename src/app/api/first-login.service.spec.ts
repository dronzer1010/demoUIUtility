import { TestBed } from '@angular/core/testing';

import { FirstLoginService } from './first-login.service';

describe('FirstLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirstLoginService = TestBed.get(FirstLoginService);
    expect(service).toBeTruthy();
  });
});
