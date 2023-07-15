import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from '../../user.service';
import { UserModalService } from './modal-user/user-modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private usService: UserService,
    public modalUser: UserModalService,
  ) {}

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
