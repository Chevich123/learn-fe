import { Component } from '@angular/core';
import { AppService } from './service/app.service';
import { TokenService } from './service/token.service';
import { IUser } from './user/iuser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  user: IUser = new IUser('', '');

  constructor(private tokenService: TokenService,
    private appService: AppService) {
  }

  get getToken() {
    return this.tokenService.getToken();
  }

  getUser() {
    this.appService.getUser().subscribe(
      (response: any) => {
        this.user = response;
      });
  }

  logout() {
    return this.appService.logout();
  }
}
