import { TestBed, getTestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './authGuard';
import { of } from 'rxjs';

describe('AuthGuard', () => {

  let guard: AuthGuard;

  const routeMock: any = {
    snapshot: jasmine.createSpy(),
  };

  const mockTokenService = {
    isAuthorized: jasmine.createSpy(),
  };

  const routerStateMock: any = {
    snapshot: jasmine.createSpy()
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
    expect(mockTokenService.isAuthorized.and.returnValue(of(false)));
    expect(guard.canActivate(routeMock, routerStateMock)).toBeTruthy();
  });
});
