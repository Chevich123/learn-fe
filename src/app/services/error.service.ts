import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorHistory: string[] = [];
  isOpen = false

  add(error: string) {
    this.errorHistory.push(error);
    this.isOpen = true;
  }

  open() {
    if(this.errorHistory.length > 0) this.isOpen = true;
  }

  clear() {
    this.errorHistory = [];
    this.isOpen = false;
  }
}
