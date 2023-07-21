import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<{ data: IUser[]; total: number }> {
    return this.http.get<{ data: IUser[]; total: number }>(this.url);
  }

  create(user: Omit<IUser, 'userId'>): Observable<IUser> {
    return this.http.post<IUser>(this.url, user);
  }

  delete(userID: string): Observable<string> {
    const url = `${this.url}/${userID}`;
    return this.http.delete<string>(url);
  }
}
