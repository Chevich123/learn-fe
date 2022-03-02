import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs'
import { LoggedInGuard } from './loggedInGuard';

describe('loggedInGuard', () => {

  let guard: LoggedInGuard;

  let routeMock: any = {
    snapshot: jasmine.createSpy(),
  };

  let mockTokenService = {
    isAuthorized: jasmine.createSpy()
  }

  let routeStateMock: any = { snapshot: jasmine.createSpy()};


  let routerMock: any = {navigate: jasmine.createSpy()}


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LoggedInGuard,
        { provide: Router, useValue: routerMock },

      ]
    });
    guard = TestBed.inject(LoggedInGuard)
  });


  it('is auth1', () => {
    expect(mockTokenService.isAuthorized.and.returnValue(of(true)))
    expect(guard.canActivate(routeMock,routeStateMock)).toBeTruthy()
  });

});
