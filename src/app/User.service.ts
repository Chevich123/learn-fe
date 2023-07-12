import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './shared/interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<{ data: User[]; total: number }> {
    return this.http.get<{ data: User[]; total: number }>(
      'http://localhost:3000/users',
    );
  }
}
