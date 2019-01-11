import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../service/appointment.service';
import {Router} from '@angular/router';
import {Appointment} from '../api/appointment';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-appointment-doctor-list',
  templateUrl: './appointment-doctor-list.component.html',
  styleUrls: ['./appointment-doctor-list.component.scss']
})
export class AppointmentDoctorListComponent implements OnInit {

  appointments: Array<Appointment>;
  username: string;

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit() {

    this.username = localStorage.getItem('username');

    this.appointmentService.getAll()
      .subscribe((appointments: any) => {
        this.appointments = appointments;
      });
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

}
