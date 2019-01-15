import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from '../service/appointment.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-appointment-doctor-form',
  templateUrl: './appointment-doctor-form.component.html',
  styleUrls: ['./appointment-doctor-form.component.scss']
})
export class AppointmentDoctorFormComponent implements OnInit {

  patientOption;
  appointmentFormDoctor;

  constructor(private router: Router, private appointmentService: AppointmentService, private userService: UserService) { }


  ngOnInit() {

    this.appointmentFormDoctor = new FormGroup({
      'appointmentDate': new FormControl(),
      'appointmentTime': new FormControl(),
      'patient': new FormControl(),
    }

    this.userService.getAll()
      .subscribe((patient: any) => {
        this.patientOption = patient;
      });
  }
}
