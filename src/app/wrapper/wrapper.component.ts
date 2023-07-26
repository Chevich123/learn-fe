import { Component } from '@angular/core';
<<<<<<< HEAD
import { AuthService } from 'src/app/services/auth.service';
=======
import { AuthService } from 'src/app/auth.service';
import { ErrorService } from '../error.service';
>>>>>>> 4019841 (basic ngFor errors in wrapper)

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {
  constructor(private auth: AuthService, public errorService: ErrorService) {}
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
