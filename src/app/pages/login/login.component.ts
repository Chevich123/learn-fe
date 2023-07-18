import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error = false;
  date: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    username: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

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
    this.authService.login(this.date.value).subscribe({
      error: () => {
        this.error = true;
      },
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
