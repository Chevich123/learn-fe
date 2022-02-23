import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      Validators.minLength(3),
      Validators.pattern("(?!^ |.* $)^[^\t]+$")
    ]),
    "email": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "phone": new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]{12}",)
    ]),
    "site": new FormControl("", [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern("(?!^ |.* $)^[^\t]+$")
    ])
  });

}
