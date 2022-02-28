import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../user/iuser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  error = '';

  constructor(private http: HttpClient) {
  }

  getPage(start: number, finish: number, token: string | undefined): Observable<IUser[]> {
    return this.http.get<IUser[]>(`http://localhost:3000/users?start=` + start + '&limit=' + finish, {
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

  create(token: string | undefined,
         username: string | undefined,
         password: string | undefined,
         email: string | undefined,
         phone: string | undefined,
         site: string | undefined,
  ): Observable<IUser> {
    return this.http.post<IUser>(`http://localhost:3000/users`,
      {
        username: username,
        email: email,
        phone: phone,
        password: password,
        site: site,
      },
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

  edit(token: string | undefined, user: IUser, userId: string | null){
    const url = `http://localhost:3000/users/${userId}`;
    return this.http.patch<String>(url, user, {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    });
  }
}
