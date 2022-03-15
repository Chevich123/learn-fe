import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../service/token.service';
import { UsersService } from '../service/users.service';
import { IUser } from '../user/iuser';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../service/app.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
})
export class EditingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private appService: AppService,
  ) { }

  id: string | null = '';
  user: IUser = new IUser('', '');
  data = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(EditDialogComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
      this.user.username = dialogRef.componentInstance.name;
      this.user.email = dialogRef.componentInstance.email;
      this.user.phone = dialogRef.componentInstance.phone;
      this.user.site = dialogRef.componentInstance.site;
      this.user.avatar = dialogRef.componentInstance.imagePreview as string
      if (!this.data) {
        this.redirect();
      } else {
        this.edit();
      }
    });
  }

  redirect() {
    this.appService.navigate(['/users'], undefined);
  }

  edit() {
    this.usersService.edit(this.tokenService.getToken(), this.user, this.id).subscribe();
    this.redirect();
  }
}
