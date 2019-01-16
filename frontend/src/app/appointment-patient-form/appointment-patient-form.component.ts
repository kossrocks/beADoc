import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AppointmentService} from '../service/appointment.service';
import {InquiryService} from '../service/inquiry.service';
import {UserService} from '../service/user.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-appointment-patient-form',
  templateUrl: './appointment-patient-form.component.html',
  styleUrls: ['./appointment-patient-form.component.scss']
})
export class AppointmentPatientFormComponent implements OnInit {

  inquiryForm;
  users;

  constructor(private router: Router, private inquiryService: InquiryService, private userService: UserService) { }

  ngOnInit() {

    this.inquiryForm = new FormGroup( {
      'soon': new FormControl(),
      'monday': new FormControl(),
      'tuesday': new FormControl(),
      'wednesday': new FormControl(),
      'thursday': new FormControl(),
      'friday': new FormControl(),
      'morning': new FormControl(),
      'midday': new FormControl(),
      'afternoon': new FormControl(),
    });


    this.userService.getAll()
      .subscribe((users: any) => {
        this.users = users;
      });

  }



  askForAppointment() {
   /* const id = this.users.filter((u) => u.username === localStorage.getItem('username'))[0].id;
    this.inquiryForm.patchValue({patientId: id});*/
    const inquiry = this.inquiryForm.value;
    this.inquiryService.create(inquiry)
      .subscribe((response: any) => {
        alert('inquiry created');
        this.router.navigate(['/appointment-patient-list']);
      });
  }

  goBackToList() {
    this.router.navigate(['/appointment-patient-list']);
  }

}
