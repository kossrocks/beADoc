import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../api/user';
import {Alert} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();
  jwtHelperService: JwtHelperService;

  accessTokenLocalStorageKey = 'access_token';

  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelperService = new JwtHelperService();
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: '
        + this.jwtHelperService.getTokenExpirationDate(token));
      this.isLoggedIn = !this.jwtHelperService.isTokenExpired(token);
    }
    this.loggedInChange.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  login(user) {
    return this.http.post('/api/auth/', user, {
      'headers': new HttpHeaders({'Content-Type': 'application/json'}),
      'responseType': 'text',
      observe: 'response'
    }).pipe(map((res: any) => {
      const token = res.headers.get('Authorization').replace(/^Bearer /, '');
      localStorage.setItem(this.accessTokenLocalStorageKey, token);
      console.log(this.jwtHelperService.decodeToken(token));
      this.loggedInChange.next(true);
      this.router.navigate(['/home']);
      return res;
    }));
  }

  logout() {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.loggedInChange.next(false);
    this.router.navigate(['/login']);
  }


  getById(id: string) {
    return this.http.get('/api/dto/users/' + id).pipe(map((res: any) => {
      if (res.dayOfBirth) {
        res.dayOfBirth = new Date(res.dayOfBirth);
      }
      return res;
    }));
  }

  getAll() {
    return this.http.get('/api/users').pipe(
      map((response: any) => {
        return response._embedded.users;
      })
    );
  }
  getAllDTOs() {
    return this.http.get('/api/dto/users').pipe(
      map((response: any) => {
        return response._embedded.users;
      })
    );
  }

  getAllByName () {
    return this.http.get('/api/users').pipe(
      map((response: any) => {
        const users: Array<User> = [];
        for (const user of response._embedded.users) {
            users.push(user.id.toString().concat(': ' + user.name + ' ' + user.lastName + ' (' + user.username + ')'));
        }
        return users;
      })
    );
  }

  getAllEmployees() {
    return this.http.get('/api/users').pipe(
      map((response: any) => {
        const employees: Array<User> = [];
        for (const user of response._embedded.users) {
          if (user.admin || user.employee) {
            employees.unshift(user);
          }
        }
        return employees;
      })
    );
  }

  getAllPatients() {
    return this.http.get('/api/users').pipe(
      map((response: any) => {
        const patients: Array<User> = [];
        for (const user of response._embedded.users) {
          if (!user.admin && !user.employee) {
            patients.unshift(user);
          }
        }
        return patients;
      })
    );
  }

  delete(user) {
    return this.http.delete('/api/users/' + user.id);
  }

  update(user: User) {
    return this.http.put('/api/dto/users/' + user.id, user).pipe(map((res: any) => {
      if (res.dayOfBirth) {
        res.dayOfBirth = new Date(res.dayOfBirth);
      }
      return res;
    }));
  }

  create(user: User) {
    return this.http.post('/api/dto/users', user);
  }

}
