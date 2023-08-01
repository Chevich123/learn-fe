import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiURL}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<{ data: IUser[]; total: number }> {
    return this.http.get<{ data: IUser[]; total: number }>(`${this.url}/users`);
  }

  updateUser(id: string, user: Partial<IUser>): Observable<Partial<IUser>> {
    return this.http.patch<IUser>(`${this.url}/users/${id}`, user);
  }

  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/users/${id}`);
  }

  create(user: Omit<IUser, 'userId'>): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/users`, user);
  }

  delete(userID: string): Observable<string> {
    return this.http.delete<string>(`${this.url}/users/${userID}`);
  }
}
