import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../user/iuser';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  error = '';

  constructor(private http: HttpClient) {
  }

  getPage(start: number, finish: number, token: string | undefined): Observable<IUser[]> {
    return this.http.get<IUser[]>(`http://localhost:3000/users?start=` + start +'&limit=' + finish, {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    });
  }

  getAll(token: string | undefined): Observable<IUser[]> {
    return this.http.get<IUser[]>(`http://localhost:3000/users`, {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    });
  }

  create(token: string | undefined, user: FormGroup): Observable<IUser> {
    return this.http.post<IUser>(`http://localhost:3000/users`,
      {username: user.get('username')?.value,
        email: user.get('email')?.value,
        phone: user.get('phone')?.value,
        password: user.get('password')?.value,
        site: user.get('site')?.value},
      {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    });
  };

  delete(token: string | undefined, userId: string) {
    const url = `${ `http://localhost:3000/users` }/${ userId }`;
    return this.http.delete<String>(url, {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    });
  }
}
