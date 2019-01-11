import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './service/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

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
  getUserRole() {
    this.tokenDecoder = new JwtHelperService();
    this.name = localStorage.getItem('username');
    this.token = this.tokenDecoder.decodeToken(localStorage.getItem('access_token'));
    if (this.token['authorities'].includes('ROLE_ADMIN')) {
      this.isAdmin = true;
      this.isEmployee = true;
    } else if (this.token['authorities'].includes('ROLE_EMPLOYEE')) {
      this.isEmployee = true;
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // handle any redirects if a user isn't authenticated
    this.getUserRole()
    if (!this.isEmployee) {
      // redirect the user
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
