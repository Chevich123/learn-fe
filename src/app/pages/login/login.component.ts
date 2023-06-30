import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorPass() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('password')
      ? ''
      : 'Password less then 6 symbols';
  }
}
