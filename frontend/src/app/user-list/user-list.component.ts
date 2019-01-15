import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../api/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Array<User>;
  title: String;
  headElements = ['Username', 'Name', 'LastName', 'eMail', 'isEmployee', 'isAdmin'];

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'employees') {
      this.userService.getAllEmployees()
        .subscribe((users: any) => {
          this.users = users;
          this.title = 'Employees';
        });
    } else if (id === 'patients') {
      this.userService.getAllPatients()
        .subscribe((users: any) => {
          this.users = users;
          this.title = 'Patients';
        });
    }
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
