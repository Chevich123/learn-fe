import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private router: Router,
  ) {}

  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.minLength(6)]],
    site: [''],
    tel: ['', this.phoneVal],
  });

  phoneVal(control: FormControl): { isPhoneValid: boolean } | null {
    const phoneRegex = /^\+?\d{1,3}\s*\(?\d{2}\)?\s*?\d{3}-?\d{2}-?\d{2}$/;
    const value = control.value;
    if (!phoneRegex.test(value)) {
      return { isPhoneValid: true };
    }
    return null;
  }

  submit() {
    const { name, email, password, site, tel } = this.userForm.value;
    this.userServ
      .create({
        username: name,
        password: password,
        email: email,
        phone: tel,
        site: site,
      })
      .subscribe(() => {
        this.router.navigate(['/users']);
      });
  }
}
