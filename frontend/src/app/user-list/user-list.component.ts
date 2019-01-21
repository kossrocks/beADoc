import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../api/user';
import {UserService} from '../service/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Array<User>;
  title: String;
  headElements = ['Username', 'Name', 'LastName', 'eMail', 'isEmployee', 'isAdmin'];
  searchString: string;
  searchList = ['name', 'username', 'lastName'];

  order = 1;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
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
            this.headElements.pop();
            this.headElements.pop();
          });
        break;
      }
      case 'patients': {
        this.userService.getAllPatients()
          .subscribe((users: any) => {
            this.users = users;
            this.title = 'Patients';
            this.headElements.pop();
            this.headElements.pop();
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
        this.toastr.success('You sucessfully deleted the User', 'Deletion of User');
      });

  }

  createUser() {
    this.router.navigate(['/user-form']);
  }

  sortTable(prop: string) {

    const property = this.firstLetterToLower(prop);
    this.users.sort((a, b) => {
      if (typeof a[property] == 'string') {
        return (a[property] === b[property]) ? 0 : a[property] > b[property] ? (1 * this.order) : (-1 * this.order);
      }
      if (typeof a[property] == 'boolean') {
        return (a[property] === b[property]) ? 0 : a[property] ? (this.order * - 1) : (1 * this.order);
      }
    });
    this.order = this.order * -1;
    
    return false; // do not reload
  }

  firstLetterToLower(string) {
    return string.slice(0, 1).toLowerCase() + string.slice(1);
  }

}
