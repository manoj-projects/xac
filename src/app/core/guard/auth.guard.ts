import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserSessionService } from '../../services/usersession.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (localStorage.getItem('isLoggedin')) {
  //     // logged in so return true
  //     return true;
  //   }

  //   // not logged in so redirect to login page with the return url
  //   this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  //   return false;
  // }
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private sessionService: UserSessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isAuthenticated()) {
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
        return true; 
  }
}