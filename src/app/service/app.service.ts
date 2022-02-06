import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from 'rxjs';
import {Token} from "../user/token";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {LoginDTO} from "../interfaces/loginDto";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  error: string = "";

  login(data: LoginDTO, registration: boolean): Observable<Token> {
    if (registration && data.password != data.passwordRepeat) {
      this.error = "Password mismatch";
      throw Error("Password mismatch");
    }

    this.error = "";

    return this.http
      .post<Token>(`http://localhost:3000/auth/login`, data).pipe(
        catchError(this.handleError<Token>("Invalid profile"))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (): Observable<T> => {
      this.error = operation;

      return of(result as T);
    }
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  navigate(strings: string[], token: string | undefined) {
    this.router.navigate(strings, {queryParams: {token: token}});
  }
}
