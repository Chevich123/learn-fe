import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      this.setToken(token);
    }
  }

  private token?: string = '';

  setToken(token: string | undefined) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
