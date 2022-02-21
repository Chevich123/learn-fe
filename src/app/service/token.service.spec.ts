import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from './app.service';
import { UsersService } from './users.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

describe('TokenService', () => {
  let appService: AppService;
  let tokenService: TokenService;
  let component: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [UsersService, AppService]
    }).compileComponents();
    tokenService = TestBed.inject(TokenService);
    appService = TestBed.inject(AppService);
    component = new DashboardComponent(tokenService, appService);
  });

  it('should be created', () => {
    expect(tokenService).toBeTruthy();
  });

  it('should get token', () => {
    const testToken = 'token'
    spyOn(tokenService, 'getToken').and.returnValue(testToken);
    component.getToken;
    expect(component.getToken).toContain(testToken);
  });

  it('should create token', () => {
    const testToken = 'token'
    tokenService.setToken(testToken);
    expect(component.getToken).toEqual(testToken);
  });
});
