import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from "../service/token.service";
import {AppService} from "../service/app.service";
import {IUser} from "../user/iuser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string | undefined;
  user: IUser = new IUser('', '');

  constructor(private tokenService: TokenService,
              private route: ActivatedRoute,
              private router: Router,
              private appService: AppService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tokenService.setToken(params['token']);
      console.log("My token " + this.tokenService.getToken());
    });
  }

  getToken() {
    return this.tokenService.getToken();
  }

  getError() {
    return this.appService.error;
  }

  redirect() {
    if (this.getError().length > 0) return;

    this.appService.navigate(['/profile'], this.token);
  }

  login(data: { username: string; password: string }) {
    return this.appService.login(data).subscribe(
      x => {
        this.token = x?.access_token;
        this.redirect()
      }
    );
  }
}
