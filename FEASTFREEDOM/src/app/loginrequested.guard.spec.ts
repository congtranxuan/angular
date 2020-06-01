import { TestBed } from '@angular/core/testing';

import { LoginrequestedGuard } from './loginrequested.guard';

describe('LoginrequestedGuard', () => {
  let guard: LoginrequestedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginrequestedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
