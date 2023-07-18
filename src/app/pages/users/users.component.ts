import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService, private rout: Router) {}

  columns = [
    {
      columnDef: 'UserID',
      header: 'ID',
      cell: (user: IUser) => user.userId,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (user: IUser) => `${user.username}`,
    },
    {
      columnDef: 'password',
      header: 'Password',
      cell: (user: IUser) => `${user.password}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (user: IUser) => `${user.email}`,
    },
    {
      columnDef: 'phone',
      header: 'Phone',
      cell: (user: IUser) => `${user.phone}`,
    },
    {
      columnDef: 'site',
      header: 'Site',
      cell: (user: IUser) => `${user.site}`,
    },
  ];
  dataSource: IUser[] = [];
  displayedColumns = this.columns.map((c) => c.columnDef);

  getUsers() {
    this.userService.getUsers().subscribe(
      (usersResponse) => {
        this.dataSource = usersResponse.data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      },
    );
  }

  deleteUser(userID: string): void {
    let bool = confirm('Вы уверены что хотите удалить?');
    if (bool) {
      this.userService.delete(userID).subscribe(
        () => {
          this.getUsers();
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      return;
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
