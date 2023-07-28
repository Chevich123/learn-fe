import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  username: string | null = null;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('access_token');
    this.username = localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    this.token = null;
    this.username = null;
  }

  login(body: {
    password: string;
    username: string;
  }): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${environment.apiURL}/auth/login`, body)
      .pipe(
        tap((payload) => {
          this.token = payload.access_token;
          this.username = body.username;
          localStorage.setItem('access_token', this.token);
          localStorage.setItem('username', this.username);
        }),
      );
  }
}
