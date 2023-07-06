import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';

  constructor(private http: HttpClient) {
    localStorage.getItem('access_token');
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
          console.log('tyt', localStorage);
        }),
      );
  }
}
