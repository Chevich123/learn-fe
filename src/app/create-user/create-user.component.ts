import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { TokenService } from '../service/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../user/iuser';
import { Router } from '@angular/router';
import { ValidatePhone, ValidateUrl } from '../validators/url.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  error = '';
  users: any;
  userForms = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,  Validators.pattern('[0-9]*')]),
    site: new FormControl('', [Validators.required, ValidateUrl]),
  });

  constructor(private usersService: UsersService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAll();

  }

  private getAll() {
    this.usersService.getAll(this.tokenService.getToken()).subscribe(
      users => {
        this.users = users;
      },
    );
  }

  newUser() {
    this.error = '';
    let ourUser = this.users.find((user1: { username: string; }) => user1.username === this.userForms.get('username')?.value);

    if (ourUser) {
      this.error = 'User already exists';
      return;
    }

    const user  = this.userForms.value;
    this.usersService.create(this.tokenService.getToken(), user).subscribe(
      user => this.router.navigate(['/users']),
      error => alert(error.name),
    );
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
