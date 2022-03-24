import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Token } from '../user/token';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginDTO } from '../interfaces/loginDto';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) {
  }

  login(data: LoginDTO): Observable<Token> {
    this.error = '';
    return this.http
      .post<Token>(`${environment.API_URL}/auth/login`, data).pipe(
        catchError(this.handleError<Token>('Invalid profile')),
        tap(
          ({ access_token }) => {
            if (!access_token) {
              return;
            }
            localStorage.setItem('auth-token', access_token);
            this.tokenService.setToken(access_token);
          },
        ),
      );
  }

  getUser() {
    return this.http.get(`${environment.API_URL}/profile`);
  }

  logout() {
    this.tokenService.setToken(undefined);
    localStorage.clear();
    this.router.navigate(['/']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (): Observable<T> => {
      this.error = operation;

      return of(result as T);
    };
  }

  navigate(strings: string[], token: string | undefined) {
    this.router.navigate(strings, { queryParams: { token: token } });
  }
}
