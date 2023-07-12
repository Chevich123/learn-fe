import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { UserService } from '../../User.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private usService: UserService) {}
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

  getUsers() {
    this.usService.getUsers().subscribe(
      (usersResponse) => {
        this.dataSource = usersResponse.data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      },
    );
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
