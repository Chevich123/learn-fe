import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { LoggedInGuard } from './loggedInGuard';

describe('loggedInGuard', () => {

  let guard: LoggedInGuard;

  const routeMock: any = {
    snapshot: jasmine.createSpy(),
  };

  const mockTokenService = {
    isAuthenticated: jasmine.createSpy(),
  };

  const routeStateMock: any = { snapshot: jasmine.createSpy() };

  const routerMock: any = { navigate: jasmine.createSpy() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInGuard,
        { provide: Router, useValue: routerMock },
        { provide: TokenService, useValue: mockTokenService },
      ],
    });
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should return true if is TokenService.isAuthorized', (done) => {
    mockTokenService.isAuthenticated.and.returnValue(true);
    guard.canActivate(routeMock, routeStateMock).subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should return false and navigate if is not TokenService.isAuthorized', (done) => {
    mockTokenService.isAuthenticated.and.returnValue(false);
    guard.canActivate(routeMock, routeStateMock).subscribe(result => {
      expect(result).toBeFalsy();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: {
          accessDenied: true,
        },
      });
      done();
    });
  });

});
