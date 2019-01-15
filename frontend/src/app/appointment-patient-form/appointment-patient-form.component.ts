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

  appointmentForm;
  currentUser;

  constructor(private router: Router, private inquiryService: InquiryService, private userService: UserService) { }

  ngOnInit() {

    this.appointmentForm = new FormGroup( {
      'soon': new FormControl(),
      'monday': new FormControl(),
      'tuesday': new FormControl(),
      'wednesday': new FormControl(),
      'thursay': new FormControl(),
      'friday': new FormControl(),
      'morning': new FormControl(),
      'midday': new FormControl(),
      'evening': new FormControl(),
      'patientId': new FormControl(),
    });



  }



  askForAppointment() {
    const inquiry = this.appointmentForm.value;
    this.inquiryService.create(inquiry);
  }

  goBackToList() {
    this.router.navigate(['/appointment-patient-list']);
  }

}
