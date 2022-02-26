import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppService } from '../service/app.service';
import { TokenService } from '../service/token.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockHttpClient = {
    get: jasmine.createSpy(),
    post: jasmine.createSpy(),
  };
  const mockAppService = {
    login: jasmine.createSpy(),
    http: mockHttpClient,
    redirect: jasmine.createSpy(),
    error: '',
    navigate: jasmine.createSpy(),
  };
  const mockTokenService = {
    setToken: jasmine.createSpy(),
    getToken: jasmine.createSpy(),
  };
  const mockRouter = {
    navigate: jasmine.createSpy(),
  };
  const mockActivatedRouter = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: TokenService, useValue: mockTokenService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRouter },
        { provide: AppService, useValue: mockAppService },
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not redirect if has error', () => {
    mockAppService.navigate.and.returnValue('/login');
    mockAppService.error = 'error';
    expect(component.redirect()).toBeUndefined();
  });

  it('should login', () => {
    const token = 'token';
    mockAppService.login.and.returnValue(of(token));
    mockRouter.navigate.and.returnValue(of('/users'));
    component.login();
    expect(mockAppService.login).toHaveBeenCalled();
  });

  it('should redirect', () => {
    mockAppService.navigate.and.returnValue('/login');
    component.redirect();
    expect(mockAppService.navigate).toHaveBeenCalled();
  });

  it('should return token', () => {
    const token = 'token';
    mockTokenService.getToken.and.returnValue(token);
    let tokenSpy = component.getToken();
    expect(tokenSpy).toEqual(token);
  });

});
