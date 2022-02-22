import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from '../service/users.service';
import { AppService } from '../service/app.service';
import { TokenService } from '../service/token.service';
import { EMPTY, of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let appService: AppService;
  let tokenService: TokenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [UsersService, AppService, TokenService],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    tokenService = new TokenService();
    const spyHttp = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) });
    const spyRouter = jasmine.createSpyObj('Router', { post: of({}), get: of({}) })
    const activateRoute = jasmine.createSpyObj('ActivatedRoute', { post: of({}), get: of({}) })
    appService = new AppService(spyHttp, spyRouter, tokenService);
    component = new LoginComponent(tokenService, activateRoute, spyRouter, appService);
  });

  it('should login', () => {
    const spy = spyOn(appService, 'login').and.callFake(() => {
      return EMPTY;
    });

    component.login();
    expect(spy).toHaveBeenCalled();
  });

  it('should return token', () => {
    const token = 'token'
    spyOn(tokenService, 'getToken').and.returnValue(token);
    const spyToken = component.getToken();
    expect(spyToken).toEqual(token);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
