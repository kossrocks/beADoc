import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AppointmentService} from '../service/appointment.service';

@Component({
  selector: 'app-appointment-patient-form',
  templateUrl: './appointment-patient-form.component.html',
  styleUrls: ['./appointment-patient-form.component.scss']
})
export class AppointmentPatientFormComponent implements OnInit {

  appointmentForm;

  constructor(private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit() {

    this.appointmentForm = new FormGroup( {
      'preferences': new FormControl(),
      'day': new FormControl(),
      'time': new FormControl()
    });
  }


  askForAppointment() {
    const appointment = this.appointmentForm.value;
    this.appointmentService.create(appointment);
  }

  goBackToList() {
    this.router.navigate(['/appointment-patient-list']);
  }

  fixAppointment() {
    const appointment = this.appointmentForm.value;
    this.appointmentService.update(appointment);
  }

}
