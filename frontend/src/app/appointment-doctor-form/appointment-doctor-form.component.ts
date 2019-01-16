import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from '../service/appointment.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {InquiryService} from '../service/inquiry.service';

@Component({
  selector: 'app-appointment-doctor-form',
  templateUrl: './appointment-doctor-form.component.html',
  styleUrls: ['./appointment-doctor-form.component.scss']
})
export class AppointmentDoctorFormComponent implements OnInit {

  patientOption;
  appointmentFormDoctor;
  inquiryentries;

  constructor(private router: Router, private appointmentService: AppointmentService, private userService: UserService,
              private inquiryService: InquiryService) { }


  ngOnInit() {

    this.appointmentFormDoctor = new FormGroup({
      'appointmentDate': new FormControl(),
      'appointmentTime': new FormControl(),
      'patient': new FormControl(),
    });

    this.userService.getAllPatientsByUsername()
      .subscribe((patient: any) => {
        this.patientOption = patient;
      });

    this.inquiryService.getAll()
      .subscribe((inquiryentries: any) => {
        this.inquiryentries = inquiryentries;
      });
  }

  goBackToList() {
    this.router.navigate(['/appointment-doctor-list']);
  }

  createAppointment () {
    const patientToChange = this.appointmentFormDoctor.controls.patient.value;
    const splitIt = patientToChange.split(':')[0];
    const toInt: number = parseInt(splitIt, 10);
    this.appointmentFormDoctor.controls.patient.setValue('3');

    alert(this.appointmentFormDoctor.controls.patient.value);

    // const appointment = this.appointmentFormDoctor.value;

    /*this.appointmentService.create(appointment)
      .subscribe((response: any) => {
        alert('created successfully');
          this.router.navigate(['/appointment-doctor-list', response.id]);
      });*/
  }
}
