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

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let tokenService: TokenService;
  let usersService: UsersService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [UsersService, AppService, TokenService],
      declarations: [ CreateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    tokenService = new TokenService();
    const spyHttp = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) });
    const spyRouter = jasmine.createSpyObj('Router', { post: of({}), get: of({}) });
    usersService = new UsersService(spyHttp);
    component = new CreateUserComponent(usersService, tokenService, spyRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all', () => {
    const user: IUser = new IUser('username','123456');
    const users = [user];
    const spy = spyOn(usersService, 'getAll').and.returnValue(of(users));
    component.users = [];
    // @ts-ignore
    component.getAll();

    // @ts-ignore
    component.tokenService.token = 'token';
    expect(spy).toHaveBeenCalled();
    expect(component.users).toContain(user);
  });

  it('should create user', () => {
    component.userForms = new FormGroup({
      username: new FormControl('username', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
      password: new FormControl('password', [Validators.required]),
    });
    const user: IUser = new IUser('username','123456');
    const spy = spyOn(usersService, 'create').and.returnValue(of(user));
    component.users = [];
    component.newUser();
    expect(spy).toHaveBeenCalled();
  });

  it('should return error if user exists', () => {
    component.userForms = new FormGroup({
      username: new FormControl('username', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
      password: new FormControl('password', [Validators.required]),
    });
    const user: IUser = new IUser('username','123456');
    spyOn(usersService, 'create').and.returnValue(of(user));
    component.users = [user];
    component.newUser();
    expect(component.error).toEqual('User already exists');
  });
});
