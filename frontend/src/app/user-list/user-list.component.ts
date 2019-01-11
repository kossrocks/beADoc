import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {User} from '../api/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Array<User>;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {

    this.userService.getAll()
      .subscribe((medicines: any) => {
        this.users = medicines;
      });

  }

  deleteUser(user: User) {

    this.userService.delete(user)
      .subscribe(() => {
        this.ngOnInit();
      });

  }

  createUser() {
    this.router.navigate(['/user-form']);
  }

}
