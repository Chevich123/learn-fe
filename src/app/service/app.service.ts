import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from 'rxjs';
import {Token} from "../user/token";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  error: string = "";

  login(data: FormGroup, registration: boolean): Observable<Token> {
    if (registration && data.get('password')?.value != data.get('passwordRepeat')?.value) {
      this.error = "Password mismatch";
      throw Error("Password mismatch");
    }

    this.error = "";

    return this.http
      .post<Token>(`http://localhost:3000/auth/login`, {username: data.get('username')?.value, password: data.get('password')?.value}).pipe(
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
