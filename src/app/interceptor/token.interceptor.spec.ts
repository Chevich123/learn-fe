import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { UsersService } from '../service/users.service';
import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let http: HttpTestingController;
  let service: UsersService;
  const mockRouter = {};
  const mockTokenService = {
    isAuthenticated: jasmine.createSpy(),
    getToken: () => 'token',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
        { provide: Router, useValue: mockRouter },
        { provide: TokenService, useValue: mockTokenService },
      ],
    });

    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);
    mockTokenService.isAuthenticated.and.returnValue(true);
  });

  it('should set to TRUE', () => {
    service.getAll('token').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = http.expectOne('http://localhost:3000/users');
    expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer token');

    httpRequest.flush(true);
    http.verify();
  });
});
