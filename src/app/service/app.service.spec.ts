import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from './token.service';
import { of } from 'rxjs';
import { IUser } from '../user/iuser';

describe('AppService', () => {
  let service: AppService;
  const mockHttpClient = {
    get: jasmine.createSpy(),
    post: jasmine.createSpy()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
      ],
    }).compileComponents();
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const token = 'token';
    mockHttpClient.post.and.returnValue(of(token));
    service.login({username: "John", password: "123123123"}).subscribe((result) => {
      // @ts-ignore
      expect(result).toEqual(token);
      expect(mockHttpClient.post).toHaveBeenCalledOnceWith(
        `http://localhost:3000/auth/login`, {username: "John", password: "123123123"}
      )
    });
  });

  it('should get user', () => {
    const user: IUser = new IUser('username','123456');
    mockHttpClient.get.and.returnValue(of(user));
    service.getUser().subscribe((result) => {
      expect(result).toEqual(user);
      expect(mockHttpClient.get).toHaveBeenCalledOnceWith(
        'http://localhost:3000/profile',
         { headers: { Authorization: `Bearer ` } }
      )
    });
  })
});
