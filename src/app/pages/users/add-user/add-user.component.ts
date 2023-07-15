import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(private formBuilder: FormBuilder) {}

  userForm: FormGroup = this.formBuilder.group({
    userID: ['', Validators.required],
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', Validators.email],
    site: [''],
    tel: [
      '',
      [Validators.minLength(7), Validators.maxLength(7), this.isNumber],
    ],
  });

  isNumber(control: FormControl): { isNumber: boolean } | null {
    const value = control.value;
    if (isNaN(value) || Number(value) <= 0) {
      return { isNumber: true };
    }
    return null;
  }

  submit() {
    console.log(this.userForm.value);
  }
}
