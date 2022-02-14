import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { UsersService } from '../service/users.service';
import { IUser } from '../user/iuser';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../service/app.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialogContent.component.html',
})
export class DialogContent {
  constructor() { }

  name: string = '';
  form = new FormControl('', [Validators.required]);

  cancel() {
    return false;
  }

  confirm() {
    if (this.name == '') {
      return false;
    }
    else {
      return true;
    }
  }

}

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private appService: AppService
  ) { }

  id: string | null = '';
  username: string = '';
  user: IUser = new IUser('', '');
  data = false;


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(DialogContent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
      this.username = dialogRef.componentInstance.name;
      if (!this.data) {
        this.redirect()
      }
      else {
        this.edit(this.username)
      }
    });
  }

  redirect() {
    this.appService.navigate(['/users'], undefined);
  }

  edit(username: string) {
    this.user.username = username;
    this.usersService.edit(this.tokenService.getToken(), this.user, this.id).subscribe();
    this.redirect();
  }
}
