import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NoAuthGuard } from './noAuthGuard';

describe('AuthGuard', () => {

  let guard: NoAuthGuard;

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
      providers: [NoAuthGuard,
        { provide: Router, useValue: routerStateMock },
      ],
    });
    guard = TestBed.inject(NoAuthGuard);
  });

  it('should allow redirect to login for authorized user', () => {
    mockTokenService.isAuthorized.and.returnValue(false);
    expect(guard.canActivate(routeMock, routerStateMock)).toBeTruthy();
  });
});
