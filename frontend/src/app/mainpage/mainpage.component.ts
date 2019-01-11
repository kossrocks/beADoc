import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  name: String;
  token: String;
  tokenDecoder: JwtHelperService;
  isAdmin: boolean;
  isEmployee: boolean;
  constructor() { }
  ngOnInit() {
    this.getUserRole();
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
}
