import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../api/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;
  users: Array<User>;
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
    this.userService.getAll()
      .subscribe((users: any) => {
        this.users = users;
      });
  }

  login() {
    let isActive = true;
    for (const user of this.users) {
      if (user.username === this.user.username) {
        isActive = user.active;
      }
    }
    if (isActive) {
      this.userService.login(this.user)
        .subscribe((res: any) => {
        }, (error) => {
          this.toastr.error('Wrong username or password!', 'Ooopsie!');
        });
      localStorage.setItem('username', this.user.username);
    } else {
      alert('Sorry Your Account was deactivated.');
    }
  }

  callYourDoctor() {
    this.toastr.info('Please call your doctor under the number 555 - RealDoc', 'Forgot your password?');
  }
}
