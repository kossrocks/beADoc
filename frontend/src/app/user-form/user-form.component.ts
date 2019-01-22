import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm;
  shouldNavigateToList: boolean;
  isEmployee: boolean;
  isAdmin: boolean;
  name: String;
  token: String;
  tokenDecoder: JwtHelperService;
  isOwner: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {

    this.userForm = new FormGroup({
      'id': new FormControl(),
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl(),
      'name': new FormControl({disabled: true}, Validators.required),
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
      'profilPictures' : new FormControl(),
      'questionaires': new FormControl(),
      'inquiries': new FormControl(),
      'userData': new FormControl()
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getById(id)
        .subscribe((response) => {
          this.userForm.setValue(response);
          if(this.userForm.value.name == this.name){
            this.isOwner = true;
          }
        });
    }
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

  generateRandomPass() {
    const randomstring = Math.random().toString(36).slice(-8);
    this.copyToClipboard(randomstring);
    this.userForm.value.password = randomstring;
    alert('Generated Password: ' + randomstring + '\n' + 'Also was copied to clipboard Strg+V to insert!');
    this.userService.getById(this.userForm.value.id)
      .subscribe((response) => {
        response.password = randomstring;
        this.userForm.setValue(response);
        this.saveUser();
      });
  }

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  saveUser() {

    const user = this.userForm.value;
    if (user.id) {
      this.userService.update(user)
        .subscribe((response) => {
          if(user.active)this.toastr.info('Your profile was updated!', 'Update!');
          if(!user.active)this.toastr.success('You deleted a User!', 'User deleted!');
          this.userForm.setValue(response);
          if (this.shouldNavigateToList) {
            this.navigateToList();
          }
        });
    } else {
      this.userService.create(user)
        .subscribe((response: any) => {
          this.toastr.success('You successfully created a new User', 'New User!');
          if (this.shouldNavigateToList) {
            this.navigateToList();
          } else {
            this.router.navigate(['/user-form', response.id]);
          }
        });
    }
  }

  deleteUser(){
    this.userService.getById(this.userForm.value.id)
      .subscribe((response) => {
        response.active = false;
        this.userForm.setValue(response);
        this.toastr.success('You successfully deleted a User', 'User deleted!');
        this.shouldNavigateToList = true;
        this.saveUser();
      });
  }

  navigateToList() {
      this.router.navigate(['/user-list/' + localStorage.getItem('filterMode')]);
  }

  setShouldNavigateToList() {
    this.shouldNavigateToList = true;
  }

}

