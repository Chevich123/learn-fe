import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from 'rxjs';
import {Token} from "../user/token";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AppService {
  error: string ="";
  token : string | undefined;

   login(data: {username: string; password: string}): Observable<Token> {
     this.error = "";
     return this.http
       .post<Token>(`http://localhost:3000/auth/login`, data).pipe(
         catchError(this.handleError<Token>("Invalid profile"))
       )
   }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      this.error = operation;

      return of(result as T);
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  navigate(strings: string[], token: string | undefined) {
    this.router.navigate(strings, {queryParams: {token: token}});
  }
}
