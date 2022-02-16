import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../service/token.service';
import { UsersService } from '../service/users.service';
import { IUser } from '../user/iuser';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../service/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialogContent.component.html',
  styleUrls: ['./editing.component.scss']
})
export class DialogContent {
  constructor() { }

  name: string = '';
  email: string = '';
  phone: string = '';
  site: string = '';

  userForm = new FormGroup({
    "username": new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("(?!^ |.* $)^[^\t]+$")
    ]),
    "email": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "phone": new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]{12}",)
    ]),
    "site": new FormControl("", [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern("(?!^ |.* $)^[^\t]+$")
    ])
  });
}

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
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
  email: string = '';
  phone: string = '';
  site: string = '';
  user: IUser = new IUser('', '');
  data = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(DialogContent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
      this.username = dialogRef.componentInstance.name;
      this.email = dialogRef.componentInstance.email;
      this.phone = dialogRef.componentInstance.phone;
      this.site = dialogRef.componentInstance.site;
      if (!this.data) {
        this.redirect()
      }
      else {
        this.edit(this.username, this.email, this.phone, this.site)
      }
    });
  }

  redirect() {
    this.appService.navigate(['/users'], undefined);
  }

  edit(username: string, email: string, phone: string, site: string) {
    this.user.username = username;
    this.user.email = email;
    this.user.phone = phone;
    this.user.site = site;
    this.usersService.edit(this.tokenService.getToken(), this.user, this.id).subscribe();
    this.redirect();
  }
}
