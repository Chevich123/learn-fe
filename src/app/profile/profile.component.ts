import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { IUser } from '../user/iuser';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: IUser = new IUser('', '');

  constructor(private appService: AppService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  getUser() {
    this.appService.getUser().subscribe(
      (response: any) => {
        this.user = response;
      });
  }

  get getToken() {
    return this.tokenService.getToken();
  }

}
