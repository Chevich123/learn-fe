import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { TokenService } from '../service/token.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { IUser } from '../user/iuser';
import { map, mergeAll, mergeMap, Observable, of, Subject, take, toArray } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'username', 'img', 'email', 'phone', 'site', 'delete', 'edit', 'info'];
  dataSource: any;
  loaded = false;
  length = 0;
  start = 0;
  imagePreview?: string | ArrayBuffer | null;
  public user: IUser = new IUser('', '');
  private pageSize = 0;

  constructor(private usersService: UsersService,
              private tokenService: TokenService,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setLength();
    this.pageSize = 10;
    this.start = 1;
    this.getServerData();
  }

  getUserImage(image: string): Observable<SafeUrl | null> {
    const token = this.tokenService.getToken();
    return this.usersService.getImage(token, image).pipe(
      mergeMap((blob) => {
        const sub$ = new Subject<SafeUrl>();

        let reader = new FileReader();
        reader.addEventListener('load', () => {
          const safe: any = this.sanitizer.bypassSecurityTrustUrl(reader.result?.toString() || '');
          sub$.next(safe);
        }, false);
        reader.readAsDataURL(blob);

        return sub$;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }

  public getServerData(event?: PageEvent | null) {
    if (event?.pageSize) {
      this.pageSize = event.pageSize;
      this.start = event.pageIndex * event.pageSize + 1;
    }
    this.usersService.getPage(this.start, this.pageSize, this.tokenService.getToken()).pipe(
      mergeAll(),
      mergeMap((user) => {
        if (user.avatar) {
          return this.getUserImage(user.avatar).pipe(
            map(imagePreview => ({ ...user, imagePreview })),
            take(1),
          );
        }
        return of(user);
      }),
      toArray(),
    ).subscribe(
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
          if (this.start == this.length) {
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
