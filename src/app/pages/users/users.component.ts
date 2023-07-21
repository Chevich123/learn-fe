import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../products/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService, private dialog: MatDialog) {}

  columns = [
    {
      columnDef: 'UserID',
      header: 'ID',
      cell: (user: IUser) => user.userId,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (user: IUser) => user.username,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (user: IUser) => user.email,
    },
    {
      columnDef: 'phone',
      header: 'Phone',
      cell: (user: IUser) => user.phone,
    },
    {
      columnDef: 'site',
      header: 'Site',
      cell: (user: IUser) => user.site,
    },
  ];
  dataSource: IUser[] = [];
  displayedColumns = [...this.columns.map((c) => c.columnDef), 'delete'];

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
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        confirmationText: 'Are you really sure you want to delete this user?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.delete(userID).subscribe(
          () => {
            this.getUsers();
          },
          (error) => {
            console.log(error);
          },
        );
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
