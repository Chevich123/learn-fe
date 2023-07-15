import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../user.service';
import { UserModalService } from '../modal-user/user-modal.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private modalUser: UserModalService,
  ) {}

  userForm: FormGroup = this.formBuilder.group({
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
    const { name, email, site, tel } = this.userForm.value;
    this.userServ
      .create({
        userId: '',
        username: name,
        password: '',
        email: email,
        phone: tel,
        site: site,
      })
      .subscribe(() => {
        this.modalUser.close();
      });
  }
}
