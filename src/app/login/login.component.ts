import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from "../service/token.service";
import {AppService} from "../service/app.service";
import {IUser} from "../user/iuser";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: IUser = new IUser('', '');
  registration: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required])
  })

  constructor(private tokenService: TokenService,
              private route: ActivatedRoute,
              private router: Router,
              private appService: AppService) {
  }

  get username() {
    return this.loginForm.get('username');
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

  getRegistration() {
    return this.registration;
  }

  setRegistration() {
    this.registration = !this.registration;
  }

  redirect() {
    if (this.getError().length) {
      return;
    }

    this.appService.navigate(['/profile'], this.tokenService.getToken());
  }

  login() {
    return this.appService.login(this.user, this.registration).subscribe(
      token => {
        this.tokenService.setToken(token?.access_token);
        this.redirect()
      }
    );
  }
}
