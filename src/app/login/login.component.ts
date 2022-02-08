import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from "../service/token.service";
import { AppService } from "../service/app.service";
import { IUser } from "../user/iuser";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: IUser = new IUser('', '');
  form = new FormControl('', [Validators.required]);

  constructor(private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tokenService.setToken(params['token']);
    });
  }

  getToken() {
    return this.tokenService.getToken();
  }

  getError() {
    return this.appService.error;
  }

  getErrorMessage() {
    if (this.form.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.hasError('form') ? 'Not a valid form' : '';
  }

  redirect() {
    if (this.getError().length) {
      return;
    }

    this.appService.navigate(['/'], undefined);
  }

  login() {
    return this.appService.login(this.user).subscribe(
      token => {
        this.tokenService.setToken(token?.access_token);
        this.redirect()
      }
    );
  }
}
