import {Component, OnInit} from '@angular/core';

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

  path: string[] = ['user'];
  order = 1;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    const urlString = this.route.snapshot.url.toString();
    localStorage.setItem('filterMode', urlString.split(',')[1]);
    switch (id) {
      case 'employees': {
        this.userService.getAllEmployees()
          .subscribe((users: any) => {
            this.users = users;
            this.title = 'Employees';
          });
        break;
      }
      case 'patients': {
        this.userService.getAllPatients()
          .subscribe((users: any) => {
            this.users = users;
            this.title = 'Patients';
          });
        break;
      }
      case 'users': {
        this.userService.getAll()
          .subscribe((users: any) => {
            this.users = users;
            this.title = 'Users';
          });
        break;
      }
      default: {
        this.router.navigate(['/home']);
        break;
      }
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

  sortTable(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }

}
