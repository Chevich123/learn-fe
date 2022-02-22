import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from '../service/users.service';
import { AppService } from '../service/app.service';
import { TokenService } from '../service/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { IUser } from '../user/iuser';
import { Router } from '@angular/router';

fdescribe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  const mockUsersService = {
    getAll: jasmine.createSpy(),
  };
  const mockTokenService = {
    getToken: jasmine.createSpy(),
  };
  const mockRouter = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UsersService, useValue: mockUsersService},
        {provide: TokenService, useValue: mockTokenService},
        {provide: Router, useValue: mockRouter},
      ],
      declarations: [ CreateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all', () => {
    const user: IUser = new IUser('username','123456');
    const users = [user];
    mockUsersService.getAll.and.returnValue(of(users));
    component.users = [];

    // @ts-ignore
    component.getAll();

    expect(mockUsersService.getAll).toHaveBeenCalled();
    expect(component.users).toContain(user);
  });

  // it('should create user', () => {
  //   component.userForms = new FormGroup({
  //     username: new FormControl('username', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
  //     password: new FormControl('password', [Validators.required]),
  //   });
  //   const user: IUser = new IUser('username','123456');
  //   const spy = spyOn(usersService, 'create').and.returnValue(of(user));
  //   component.users = [];
  //   component.newUser();
  //   expect(spy).toHaveBeenCalled();
  // });
  //
  // it('should return error if user exists', () => {
  //   component.userForms = new FormGroup({
  //     username: new FormControl('username', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
  //     password: new FormControl('password', [Validators.required]),
  //   });
  //   const user: IUser = new IUser('username','123456');
  //   spyOn(usersService, 'create').and.returnValue(of(user));
  //   component.users = [user];
  //   component.newUser();
  //   expect(component.error).toEqual('User already exists');
  // });
});
