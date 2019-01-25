import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from '../service/appointment.service';
import {Appointment} from '../api/appointment';
import {CalendarService} from '../service/calendar.service';
import {ToastrService} from 'ngx-toastr';

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
  title = 'Appointments';
  headElementsAppointments = ['Date of Appointment', 'Time', 'Status', 'Fix Appointment'];
  sortList = ['appointmentDate','appointmentTime', 'fixed'];
  order = 1;

  constructor(private appointmentService: AppointmentService, private router: Router, private toastr: ToastrService) { }

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

  navigateToList() {
    this.router.navigate(['/appointment-patient-list']);
  }

  fixAppointment(id, index) {

    this.appointmentService.getById(id)
      .subscribe((appointment: any) => {

        appointment.fixed = !appointment.fixed;

        this.appointmentService.update(appointment) //updating of the database
          .subscribe((response) => {
            this.toastr.info('You successfully fixed your Appointment', 'Appointment fixed!');
            this.appointmentEntries[index].fixed = appointment.fixed; //updating of the view
          });
      });


  }

  sortTable(prop: string) { //function to sort the table. prop: after which property the table should be sorted
    const property = this.firstLetterToLower(prop);
    this.appointmentEntries.sort((a, b) => {
      if (typeof a[property] === 'string') {
        return (a[property] === b[property]) ? 0 : a[property] > b[property] ? (1 * this.order) : (-1 * this.order);
      }
      if (typeof a[property] === 'boolean') {
        return (a[property] === b[property]) ? 0 : a[property] ? (this.order * - 1) : (1 * this.order);
      }
    });
    this.order = this.order * -1;

    return false; // prevents the page from reloading
  }

  firstLetterToLower(string) {
    return string.slice(0, 1).toLowerCase() + string.slice(1);
  }

}
