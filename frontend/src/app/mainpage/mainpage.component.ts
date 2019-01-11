import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {User} from '../api/user';
import {UserService} from '../service/user.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  id: number;
  name: String;
  token: String;
  tokenDecoder: JwtHelperService;
  isAdmin: boolean;
  isEmployee: boolean;
  users: Array<User>;
  constructor(private router: Router, private userService: UserService) { }
  ngOnInit() {
    this.getUserRole();
    this.getUserId();
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
  getUserId() {
    this.userService.getAll()
      .subscribe((users: any) => {
        this.users = users;
      });
      for (const user of this.users) {
        if (user.username === this.name) {
        this.id = user.id;
     }
    }
  }
  editUser() {
    this.getUserId()
    this.router.navigate(['/user-form/' + this.id.toString()]);
  }
  editQuestionnaire() {
    this.getUserId()
    this.router.navigate(['/questionnaire/' + this.id.toString()]);
  }
}
