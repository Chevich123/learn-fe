import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './shared/interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  hide = false;
  getUsers(): Observable<{ data: IUser[]; total: number }> {
    return this.http.get<{ data: IUser[]; total: number }>(
      'http://localhost:3000/users',
    );
  }
  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/users', user);
  }
}
