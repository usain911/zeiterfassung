import { TestBed } from '@angular/core/testing';

import { CanNavigateToLoginGuard } from './can-navigate-to-login.guard';

describe('CanNavigateToLoginGuard', () => {
  let guard: CanNavigateToLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanNavigateToLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
