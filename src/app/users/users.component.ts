import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { TokenService } from '../service/token.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'username', 'email', 'phone', 'site', 'delete', 'edit'];
  dataSource: any;
  loaded = false;
  length = 0;
  finish = 0;
  start = 0;
  private pageSize = 0;

  constructor(private usersService: UsersService,
              private tokenService: TokenService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setLength();
    this.getServerData();
  }

  public getServerData(event?: PageEvent | null) {
    if (event?.pageSize) {
      this.pageSize = event.pageSize;
      this.finish = (event.pageIndex + 1) * this.pageSize;
      this.start = this.finish - this.pageSize + 1;
    }

    this.usersService.getPage(this.start, this.finish, this.tokenService.getToken()).subscribe(
      users => {
        this.dataSource = users;
        this.loaded = true;
      },
    );
  }

  openDialog(userId: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        userId: userId,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.delete(result);
    });
  }

  delete(userId: string) {
    if (userId.length > 0) {
      this.usersService.delete(this.tokenService.getToken(), userId).subscribe(
        () => {
          this.setLength();
          if (this.finish > this.length) {
            this.finish = this.length;
            this.start = this.finish - this.pageSize;
          }
          this.getServerData();
        },
      );

    }
  }

  private setLength() {
    return this.usersService.getAll(this.tokenService.getToken()).subscribe(
      users => {
        this.length = users.length;
      },
    );
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
