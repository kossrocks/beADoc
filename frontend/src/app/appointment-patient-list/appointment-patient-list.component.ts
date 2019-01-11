import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from '../service/appointment.service';
import {Appointment} from '../api/appointment';

@Component({
  selector: 'app-appointment-patient-list',
  templateUrl: './appointment-patient-list.component.html',
  styleUrls: ['./appointment-patient-list.component.scss']
})
export class AppointmentPatientListComponent implements OnInit {

  appointments: Array<Appointment>;
  username: string;

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit() {

    this.getUsername();

    this.appointmentService.getAll()
      .subscribe((appointments: any) => {
        this.appointments = appointments;
      });
  }

  getUsername() {
    this.username = localStorage.getItem('username');
  }

  createAppointment() {
    this.router.navigate(['/appointment-patient-form']);
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

}
