import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { TokenService } from '../service/token.service';
import { IUser } from '../user/iuser';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  error = '';
  users: any;
  user: IUser = new IUser('', '');
  form = new FormControl('', [Validators.required]);

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
    this.error = "";
    let ourUser = this.users.find((user1: { username: string; }) => user1.username==this.user.username);

    if (ourUser) {
      this.error = 'User already exists';
      return;
    }

    if (this.user.username == '' || this.user.password == '') {
      this.error = 'You must write a value';
      return;
    }

    this.usersService.create(this.tokenService.getToken(), this.user).subscribe(
      user => alert("User created"),
      error => alert(error.name),
      () => this.getAll(),
    );
  }
}
