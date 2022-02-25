import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../service/users.service';
import { AppService } from '../service/app.service';
import { TokenService } from '../service/token.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { IUser } from '../user/iuser';
import { of } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let user: IUser = new IUser('username', '123123123');
  const mockHttpClient = {
    get: jasmine.createSpy(),
    post: jasmine.createSpy(),
  };
  const mockUsersService = {
    getPage: jasmine.createSpy(),
    getAll: jasmine.createSpy(),
  };
  const mockAppService = {};
  const mockTokenService = {
    getToken: jasmine.createSpy(),
  };
  const mockRouter = {
    navigate: jasmine.createSpy(),
  };
  const mockMatDialog = {
    open: jasmine.createSpy(),
  };
  const mockActivatedRouter = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: TokenService, useValue: mockTokenService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: UsersService, useValue: mockUsersService },
        { provide: ActivatedRoute, useValue: mockActivatedRouter },
        { provide: AppService, useValue: mockAppService },
      ],
      declarations: [UsersComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {

    let users = [user];
    mockUsersService.getAll.and.returnValue(of(users));
    mockTokenService.getToken.and.returnValue(of('token'));
    mockUsersService.getPage.and.returnValue(of(users));
    mockRouter.navigate.and.returnValue('/users');
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.dataSource).toContain(user);
  });

  it('should render title', () => {
    expect(component.displayedColumns).toContain('username');
  });

  it('should get server data', function () {
    let event: PageEvent = { previousPageIndex: 0, pageIndex: 0, pageSize: 5, length: 4 };
    component.getServerData(event);
    // @ts-ignore
    expect(component.pageSize).toEqual(5);
  });

});
