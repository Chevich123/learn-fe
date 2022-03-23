import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private messageComponent: MessageComponent,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let handled: boolean = false;

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((returnedError) => {
          let errorMessage = null;

          if (returnedError.error instanceof ErrorEvent) {
            errorMessage = `Error: ${ returnedError.error.message }`;
          } else if (returnedError instanceof HttpErrorResponse) {
            errorMessage = `Error Status ${ returnedError.status }: ${ returnedError.error.error } - ${ returnedError.error.message }`;
            handled = this.handleServerSideError(returnedError);
          }
          console.error(errorMessage || returnedError);
          return of(returnedError);

        }),
      );
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    this.messageComponent.openSnackBar(error.statusText);
    return false;
  }
}
