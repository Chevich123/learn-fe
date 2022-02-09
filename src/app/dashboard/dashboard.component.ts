import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { TokenService } from '../service/token.service';
import { IUser } from '../user/iuser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: IUser = new IUser('', '');
  loaded = false;

  constructor(private tokenService: TokenService, private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUser().subscribe(
      (response: any) => {
        this.user = response;
        this.loaded = true;
      });
  }

  get getToken() {
    return this.tokenService.getToken();
  }
}
