import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../user/iuser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  error = '';

  constructor(private http: HttpClient) {
  }

  getAll(token: string | undefined): Observable<IUser[]> {
    return this.http.get<IUser[]>(`http://localhost:3000/users`, {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    });
  }

  create(token: string | undefined, user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`http://localhost:3000/users`, user, {
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
