import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { UsersService } from '../service/users.service';
import { IUser } from '../user/iuser';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../service/app.service';

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialogContent.edit.html',
})
export class DialogContent {
  constructor(public dialog: MatDialog) { }

  name: string = '';
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
  check: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(DialogContent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);    
      this.edit(dialogRef.componentInstance.name)
    });
  }

  redirect() {
    this.appService.navigate(['/users'], undefined);
  }

  edit(name: string) {
    this.user.username = name;
    this.usersService.edit(this.tokenService.getToken(), this.user, this.id).subscribe(
    );
    this.redirect();
  }
}
