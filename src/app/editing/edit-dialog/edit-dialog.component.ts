import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateEmail, ValidateName, ValidatePhone, ValidateUrl } from '../../validators/url.validator';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  constructor() { }

  name: string = '';
  email: string = '';
  phone: string = '';
  site: string = '';

  userForm = new FormGroup({
    "username": new FormControl("", [
      Validators.required,
      ValidateName
    ]),
    "email": new FormControl("", [
      Validators.required,
      ValidateEmail
    ]),
    "phone": new FormControl("", [
      Validators.required,
      ValidatePhone
    ]),
    "site": new FormControl("", [
      Validators.required,
      ValidateUrl
    ])
  });


}
