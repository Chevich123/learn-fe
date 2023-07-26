import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorHistory: string[] = [];

  add(error: string) {
    this.errorHistory.push(error);
  }

  clear() {
    this.errorHistory = [];
  }
}
