import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {InquiryService} from '../service/inquiry.service';
import {Inquiry} from '../api/inquiry';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  isLoggedIn: boolean;
  inquiries: Array<Inquiry> = [];
  token: String;
  tokenDecoder: JwtHelperService;
  name: String;
  isEmployee: boolean;
  isAdmin: boolean;

  constructor(private router: Router, private userService: UserService, private inquiryService: InquiryService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn;
    this.userService.loggedInChange.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.isLoggedIn) {
      this.inquiryService.getAll()
        .subscribe((inquiries: any) => {
          this.inquiries = inquiries;
        });
      this.getUserRole();
    }


  }

  logout() {
    this.isEmployee = false;
    this.isAdmin = false;
    this.userService.logout();
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

  showMessage() {
    this.toastr.info('The impressum is still in the works! Please come back another time!', 'Impressum');
  }
}
