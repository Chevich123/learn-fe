import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../service/app.service';
import { TokenService } from '../service/token.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockHttpClient = {
    get: jasmine.createSpy(),
    post: jasmine.createSpy(),
  };
  const mockAppService = {
    // login: () => of(true),
    login: jasmine.createSpy(),
    http: mockHttpClient,
    redirect: jasmine.createSpy()
  };
  const mockTokenService = {
    setToken: jasmine.createSpy(),
    getToken: jasmine.createSpy(),
  };
  const mockRouter = {
  };
  const mockActivatedRouter = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provides: TokenService, useValue: mockTokenService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRouter },
        { provides: AppService, useValue: mockAppService },
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

  fit('should login', () => {
    let token = 'token';
    mockAppService.login.and.returnValue(of(token));
    component.login();
    expect(mockAppService.login).toHaveBeenCalled();
  });

  fit('should return token', () => {
    const token = 'token';
    mockTokenService.getToken.and.returnValue(of(token));
    mockAppService.redirect.and.callFake(() => {
      return EMPTY;
    });
    expect(mockAppService.redirect).toHaveBeenCalled();
    expect(component.getToken()).toEqual(token);

  });
});
