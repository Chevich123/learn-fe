import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../service/app.service';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { IUser } from '../user/iuser';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let user: IUser = new IUser('username', 'password');
  const mockHttpClient = {
    get: jasmine.createSpy(),
    post: jasmine.createSpy(),
  };
  const mockTokenService = {
    getToken: jasmine.createSpy(),
  };
  const mockAppService = {
    getUser: jasmine.createSpy(),
  };
  const mockRouter = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: TokenService, useValue: mockTokenService },
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: Router, useValue: mockRouter },
        { provide: AppService, useValue: mockAppService },
      ],
      imports: [BrowserAnimationsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    mockTokenService.getToken.and.returnValue(of('token'));
    mockAppService.getUser.and.returnValue(of(user));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.user.username).toEqual(user.username);
    expect(component).toBeTruthy();
  });
});
