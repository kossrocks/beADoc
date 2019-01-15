import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './service/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from './api/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  name: String;
  token: String;
  tokenDecoder: JwtHelperService;
  isAdmin: boolean;
  isEmployee: boolean;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // handle any redirects if a user isn't authenticated
    if (!this.userService.isLoggedIn) {
      // redirect the user
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
