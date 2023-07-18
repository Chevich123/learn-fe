import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {
  constructor(private auth: AuthService) {}
  loginVisible(): boolean {
    return !this.auth.username;
  }

  get username() {
    return this.auth.username;
  }

  logout() {
    this.auth.logout();
  }
}
