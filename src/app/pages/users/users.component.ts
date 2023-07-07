import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private auth: AuthService) {}
  users: User[] = [];

  columns = [
    {
      columnDef: 'UserID',
      header: 'ID',
      cell: (user: User) => user.userId,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (user: User) => `${user.username}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (user: User) => `${user.email}`,
    },
    {
      columnDef: 'phone',
      header: 'Phone',
      cell: (user: User) => `${user.phone}`,
    },
    {
      columnDef: 'site',
      header: 'Site',
      cell: (user: User) => `${user.site}`,
    },
  ];
  dataSource = this.users;
  displayedColumns = this.columns.map((c) => c.columnDef);

  loginAndFetchUsers() {
    const username = 'scriptSQD';
    const password = '123456';

    this.auth.login({ username, password }).subscribe(
      (response) => {
        this.getUsers();
      },
      (error) => {
        console.error('Error logging in:', error);
      },
    );
  }
  getUsers() {
    this.auth.getUsers().subscribe(
      (usersResponse) => {
        this.dataSource = usersResponse.data;

        console.log('Users:', this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      },
    );
  }

  ngOnInit(): void {
    this.loginAndFetchUsers();
  }
}
