import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Token } from "../user/token";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { TokenService } from './token.service';
import { LoginDTO } from '../interfaces/LoginDto';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  error = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) {
  }

  login(data: LoginDTO): Observable<Token> {
    this.error = "";
    return this.http
      .post<Token>(`http://localhost:3000/auth/login`, data).pipe(
        catchError(this.handleError<Token>("Invalid profile"))
      )
  }

  getUser() {
    const token = this.tokenService.getToken();
    return this.http.get('http://localhost:3000/profile',
      { headers: { 'Authorization': `Bearer ${token}` } })
  }

  logout() {
    this.tokenService.setToken(undefined);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (): Observable<T> => {
      this.error = operation;

      return of(result as T);
    }
  }

  navigate(strings: string[], token: string | undefined) {
    this.router.navigate(strings, { queryParams: { token: token } });
  }
}
