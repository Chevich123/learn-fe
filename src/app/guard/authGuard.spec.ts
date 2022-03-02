import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './authGuard';

describe('AuthGuard', () => {

  let guard: AuthGuard;

  const routeMock: any = {
    snapshot: jasmine.createSpy(),
  };

  const mockTokenService = {
    isAuthorized: jasmine.createSpy(),
  };

  const routerStateMock: any = {
    snapshot: jasmine.createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard,
        { provide: Router, useValue: routerStateMock },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should allow redirect to login for authorized user', () => {
    mockTokenService.isAuthorized.and.returnValue(false);
    expect(guard.canActivate(routeMock, routerStateMock)).toBeTruthy();
  });
});
