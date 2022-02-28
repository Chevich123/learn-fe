import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { IUser } from '../user/iuser';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
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


  xit('`getPage` should call correct http.get', (done) => {
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
    const token = 'token';
    const username = 'username';
    const password = 'password';
    const user: IUser = new IUser(username, password);
    mockHttpClient.post.and.returnValue(of(user));

    service.create(token, username, password, undefined, undefined, undefined).subscribe(() => {
      expect(mockHttpClient.post).toHaveBeenCalledOnceWith(
        'http://localhost:3000/users',
        {
          username: username,
          email: undefined,
          phone: undefined,
          password: password,
          site: undefined,
        },
        { headers: { Authorization: `Bearer ${ token }` } },
      );
    });
  });

});
