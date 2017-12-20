import { Injectable }       from '@angular/core';
// import {
//   CanActivate, Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   CanActivateChild,
//   NavigationExtras,
//   CanLoad, Route
// }                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard {

  constructor(private authService: AuthService) {}

  checkLogin(): boolean {
    this.authService.onAuthStateChanged();
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // Create a dummy session id
    // let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': sessionId },
    //   fragment: 'anchor'
    // };

    // Navigate to the login page with extras
    // this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}







