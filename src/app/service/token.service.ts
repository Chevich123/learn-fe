import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string | undefined = "";

  constructor() {}

  setToken(token: string | undefined) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

}
