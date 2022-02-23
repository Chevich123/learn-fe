import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { IUser } from '../user/iuser';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { UsersComponent } from '../users/users.component';
import { TokenService } from './token.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserComponent } from '../create-user/create-user.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  let http: HttpClient;
  const mockHttpClient = {
    get: jasmine.createSpy(),
    post: jasmine.createSpy(),
    patch: jasmine.createSpy(),
    delete: jasmine.createSpy()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: HttpClient, useValue: mockHttpClient },
      ],
    }).compileComponents();
    service = TestBed.inject(UsersService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it( 'should call correct patch', (done) => {
    const token = 'token';
    const user: IUser = new IUser('test','123123');
    const userId = '1';
    const response= [{ a: 1, } as any];
    mockHttpClient.patch.and.returnValue(of(response));
    service.edit(token, user, userId).subscribe((result) => {
      expect(result).toEqual(response);
      expect(mockHttpClient.patch).toHaveBeenCalledWith(
        `http://localhost:3000/users/${userId}`, user,
        {
          headers:
            { Authorization: `Bearer ${ token }` }
        },
      );
      done();
    });
  });

  it( 'should call correct delete', (done) => {
    const token = 'token';
    const userId = '1';
    const response= [{ a: 1, } as any];
    mockHttpClient.delete.and.returnValue(of(response));
    service.delete(token, userId).subscribe((result) => {
      expect(result).toEqual(response);
      expect(mockHttpClient.delete).toHaveBeenCalledWith(
        `http://localhost:3000/users/${userId}`,
        {
          headers:
            { Authorization: `Bearer ${ token }` }
        },
      );
      done();
    });
  });

  it('`getPage` should call correct http.get', (done) => {
    const start = 0;
    const finish = 50;
    const token = 'token';
    const response = [{ a: 1 } as any];
    mockHttpClient.get.and.returnValue(of(response));
    service.getPage(start, finish, token).subscribe((result) => {
      expect(result).toEqual(response);
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        `http://localhost:3000/users?start=${ start }&limit=${ finish }`,
        { headers: { Authorization: `Bearer ${ token }` } },
      );
    });
  });

  it('should get all users', () => {
    const response = [{ a: 1 } as any];
    const token = 'token';
    mockHttpClient.get.and.returnValue(of(response));
    service.getAll(token).subscribe((result) => {
      expect(result).toEqual(response);
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        `http://localhost:3000/users`,
        { headers: { Authorization: `Bearer ${ token }` } },
      );
    });
  });

  it('should create user', () => {
    const userForms = new FormGroup({
      username: new FormControl('username', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
      password: new FormControl('123456', [Validators.required]),
    });
    const token = 'token';
    mockHttpClient.post.and.returnValue(of(userForms));
    service.create(token, userForms).subscribe(() => {
      expect(mockHttpClient.post).toHaveBeenCalledOnceWith(
        'http://localhost:3000/users',
        {
          username: userForms.get('username')?.value,
          email: userForms.get('email')?.value,
          phone: userForms.get('phone')?.value,
          password: userForms.get('password')?.value,
          site: userForms.get('site')?.value
        },
        { headers: { Authorization: `Bearer ${ token }` } },
      );
    });
  });

});
