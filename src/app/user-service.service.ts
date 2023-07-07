import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './shared/interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  getUsers(): Observable<{ data: User[]; total: number }> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.auth.token}`,
    );
    return this.http.get<{ data: User[]; total: number }>(
      'http://localhost:3000/users',
      { headers },
    );
  }
}
