import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  inquiry;

  constructor(private router: Router, private appointmentService: AppointmentService, private userService: UserService,
              private inquiryService: InquiryService, private route: ActivatedRoute) { }


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

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.inquiryService.getById(id)
        .subscribe((response) => {
          this.inquiry = response;
        });
    }
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
