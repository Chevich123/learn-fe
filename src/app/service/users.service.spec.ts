import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../user/iuser';
import { of } from 'rxjs';
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

describe('UsersService', () => {
  let service: UsersService;
  let http: HttpClient;
  const mockHttpClient = {
    patch: jasmine.createSpy(),
    delete: jasmine.createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient}
      ]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
});
