import { Component, OnInit } from '@angular/core';
import { AppService } from './service/app.service';
import { TokenService } from './service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'my-app';

  ngOnInit(): void {
    if (this.tokenService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  constructor(
    private tokenService: TokenService,
    private appService: AppService,
  private router: Router) {
  }

  get getToken() {
    return this.tokenService.getToken();
  }

  logout() {
    return this.appService.logout();
  }
}
