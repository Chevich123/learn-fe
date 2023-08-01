import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../products/confirm-delete/confirm-delete.component';
import { map, mergeAll, mergeMap, of, toArray } from 'rxjs';
import { Product } from '../../shared/interfaces/product';
import { ImageService } from '../../services/image.service';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private imageService: ImageService,
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
  dataSource = new MatTableDataSource<IUser>([]);
  displayedColumns = [
    ...this.columns.map((c) => c.columnDef),
    'image',
    'edit',
    'delete',
  ];

  private getUsers() {
    this.userService
      .getUsers()
      .pipe(
        map((data) => data.data),
        mergeAll(),
        mergeMap((user: IUser) => {
          if (user.avatar) {
            return this.imageService
              .imagePreview(user.avatar)
              .pipe(map((safeUrl) => ({ ...user, imagePreview: safeUrl })));
          }
          return of(user);
        }),
        toArray(),
      )
      .subscribe((array) => {
        this.dataSource.data = array;
      });
  }

  deleteUser(userID: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        confirmationText: 'Are you really sure you want to delete this user?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.completeDeletion(userID);
    });
  }

  completeDeletion(userID: string) {
    this.userService.delete(userID).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
