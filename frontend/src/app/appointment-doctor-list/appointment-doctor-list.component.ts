import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../service/appointment.service';
import {Router} from '@angular/router';
import {Appointment} from '../api/appointment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-appointment-doctor-list',
  templateUrl: './appointment-doctor-list.component.html',
  styleUrls: ['./appointment-doctor-list.component.scss']
})
export class AppointmentDoctorListComponent implements OnInit {

  appointments: Array<Appointment>;
  username: String;
  isAdmin: boolean;
  isEmployee: boolean;
  tokenDecoder: JwtHelperService;
  token: String;

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit() {

    this.getRoleAndUsername();

    this.appointmentService.getAll()
      .subscribe((appointments: any) => {
        this.appointments = appointments;
      });
  }

  getRoleAndUsername() {
    this.tokenDecoder = new JwtHelperService();
    this.username = localStorage.getItem('username');
    this.token = this.tokenDecoder.decodeToken(localStorage.getItem('access_token'));
    if (this.token['authorities'].includes('ROLE_ADMIN')) {
      this.isAdmin = true;
      this.isEmployee = true;
    } else if (this.token['authorities'].includes('ROLE_EMPLOYEE')) {
      this.isEmployee = true;
    }
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

}
