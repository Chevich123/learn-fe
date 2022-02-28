import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { TokenService } from '../service/token.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DialogComponent } from './dialog/dialog.component';

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
  start = 0;
  private pageSize = 0;

  constructor(private usersService: UsersService,
              private tokenService: TokenService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setLength();
    this.pageSize = 10;
    this.start = 1;
    this.getServerData();
  }

  public getServerData(event?: PageEvent | null) {
    console.log(event);
    if (event?.pageSize) {
      this.pageSize = event.pageSize;
      this.start = (event.pageIndex * event.pageSize) + 1;
    }

    this.usersService.getPage(this.start, this.pageSize, this.tokenService.getToken()).subscribe(
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
          if (this.start === this.length) {
            this.start = this.length - this.pageSize;
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
