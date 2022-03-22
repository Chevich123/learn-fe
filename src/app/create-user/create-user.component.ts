import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../service/users.service';
import { TokenService } from '../service/token.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})

export class CreateUserComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef = {} as ElementRef;

  error = '';
  users: any;
  userForms = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    site: new FormControl('', [Validators.required]),
  });

  constructor(private usersService: UsersService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAll();

  }

  private getAll() {
    this.usersService.getAll().subscribe(
      users => {
        this.users = users;
      },
    );
  }

  newUser() {
    this.error = '';
    let ourUser = this.users.find((user1: { username: string; }) => user1.username == this.userForms.get('username')?.value);

    if (ourUser) {
      this.error = 'User already exists';
      return;
    }
    this.usersService.create(this.userForms).subscribe(
      user => this.router.navigate(['/users']),
      error => alert(error.name),
    );
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
