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
    username: new FormControl('', [Validators.required]),
  });

  getErrorMessage(): string {
    if (this.date.controls['username'].hasError('required')) {
      return 'You must enter a username';
    }
    return '';
  }

  getErrorPass(): string {
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
