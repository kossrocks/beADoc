import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm;
  shouldNavigateToList: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.userForm = new FormGroup({
      'id': new FormControl(),
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl,
      'name': new FormControl(),
      'lastName': new FormControl(),
      'eMail': new FormControl(),
      'appointments': new FormControl(),
      'medicines': new FormControl(),
      'dayOfBirth': new FormControl(),
      'admin': new FormControl(),
      'employee': new FormControl(),
      'active': new FormControl(),
      'gender': new FormControl(),
      'pictures': new FormControl(),
      'email': new FormControl(),
      'questionaires': new FormControl(),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getById(id)
        .subscribe((response) => {
          this.userForm.setValue(response);
        });
    }
  }

  saveUser() {

    const user = this.userForm.value;
    let isPatient = true;
    if (user.admin || user.employee) {
      isPatient = false;
    }
    if (user.admin) {
      user.employee = true;
    }
    if (user.id) {
      this.userService.update(user)
        .subscribe((response) => {
          alert('updated successfully');
          this.userForm.setValue(response);
          if (this.shouldNavigateToList) {
            this.navigateToList(isPatient);
          }
        });
    } else {
      this.userService.create(user)
        .subscribe((response: any) => {
          alert('created successfully');
          if (this.shouldNavigateToList) {
            this.navigateToList(isPatient);
          } else {
            this.router.navigate(['/user-form', response.id]);
          }
        });
    }
  }

  navigateToList(isPatient) {
    if (isPatient) {
      this.router.navigate(['/user-list/patients']);
    } else {
      this.router.navigate(['/user-list/employees']);
    }
  }

  setShouldNavigateToList() {
    this.shouldNavigateToList = true;
  }

}

