import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../user/iuser';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  error = '';

  constructor(private http: HttpClient) {
  }

  getPage(start: number, finish: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`http://localhost:3000/users?start=` + start + '&limit=' + finish);
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.API_URL}/users`, {
      responseType: 'json',
    });
  }

  create(user: FormGroup): Observable<IUser> {
    return this.http.post<IUser>(`${environment.API_URL}/users`,
      {
        username: user.get('username')?.value,
        email: user.get('email')?.value,
        phone: user.get('phone')?.value,
        password: user.get('password')?.value,
        site: user.get('site')?.value,
        avatar: user.get('avatar')?.value,
      });
  };

  delete(userId: string) {
    const url = `${ `${environment.API_URL}/users` }/${ userId }`;
    return this.http.delete<String>(url);
  }

  edit(user: IUser, userId: string | null) {
    const url = `${environment.API_URL}/users/${ userId }`;
    return this.http.patch<String>(url, user);
  }

  getImage(image: string): Observable<Blob>{
    const url = `${environment.API_URL}/images/${image}`
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  sendImage(formData: FormData) {
    return this.http.post(`${environment.API_URL}/images`, formData, {
      observe: 'response',
    });
  }
}
