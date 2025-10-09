import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ownerguardGuard } from './ownerguard.guard';

describe('ownerguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ownerguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
