import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userForm;

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
      'profilPictures': new FormControl(),
      'inquiries': new FormControl()
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getById(id)
        .subscribe((response) => {
          this.userForm.setValue(response);
        });
    }
  }
  navigateToList() {
    this.router.navigate(['/user-list/' + localStorage.getItem('filterMode')]);
  }
}

