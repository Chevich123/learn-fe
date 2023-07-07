import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('access_token');
  }

  login(body: {
    password: string;
    username: string;
  }): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>('http://localhost:3000/auth/login', body)
      .pipe(
        tap((payload) => {
          this.token = payload.access_token;
          localStorage.setItem('access_token', this.token);
        }),
      );
  }
  getUsers(): Observable<{ data: User[]; total: number }> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`,
    );
    return this.http.get<{ data: User[]; total: number }>(
      'http://localhost:3000/users',
      { headers },
    );
  }
}
