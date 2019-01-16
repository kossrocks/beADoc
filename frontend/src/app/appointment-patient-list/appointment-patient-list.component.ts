import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from '../service/appointment.service';
import {Appointment} from '../api/appointment';
import {CalendarService} from '../service/calendar.service';

@Component({
  selector: 'app-appointment-patient-list',
  templateUrl: './appointment-patient-list.component.html',
  styleUrls: ['./appointment-patient-list.component.scss']
})
export class AppointmentPatientListComponent implements OnInit {

  appointments: Array<Appointment>;
  appointment: Appointment;
  usernameCurrent: string;
  patients;
  appointmentEntries;

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit() {

    this.getUsername();

    this.appointmentService.getAll()
      .subscribe((appointments: any) => {
        this.appointments = appointments;
      });

    this.appointmentService.getAllEntries()
      .subscribe((appointmentEntries: any) => {
        this.appointmentEntries = appointmentEntries;
    });
  }

  getUsername() {
    this.usernameCurrent = localStorage.getItem('username');
  }

  createAppointment() {
    this.router.navigate(['/appointment-patient-form']);
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

  navigateToList() {
    this.router.navigate(['/appointment-patient-list']);
  }

  fixAppointment(id, index) {

    this.appointmentService.getById(id)
      .subscribe((appointment: any) => {

        appointment.fixed = !appointment.fixed;

        this.appointmentService.update(appointment)
          .subscribe((response) => {
            alert('appointment fixed');
            this.appointmentEntries[index].fixed = appointment.fixed;
            //location.reload();
          });
      });


  }
  /*
   this.router.navigate(['appointment-patient-list']);
  */

}
