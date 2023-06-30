import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    pass: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submit() {
    console.log(this.form.value);
  }
  get pass() {
    return this.form.controls.pass as FormControl;
  }
}
