import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  date: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  getErrorMessage() {
    if (this.date.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }
    return this.date.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getErrorPass() {
    if (this.date.controls['password'].hasError('required')) {
      return 'You must enter a password';
    }
    return this.date.controls['password'].hasError('minlength')
      ? 'Password should be at least 6 characters'
      : '';
  }

  onSubmit() {
    return console.log(this.date.value);
  }
}
