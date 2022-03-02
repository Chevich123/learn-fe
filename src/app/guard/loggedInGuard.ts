import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.tokenService.isAuthenticated()) {
      return of(true);
    }
    this.router.navigate(['/login'], {
      queryParams: {
        accessDenied: true,
      },
    });
    return of(false);
  }
}
