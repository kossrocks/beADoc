import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '../service/appointment.service';
import {Router} from '@angular/router';
import {Appointment} from '../api/appointment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {InquiryService} from '../service/inquiry.service';
import {ToastrService} from 'ngx-toastr';
import {CalendarService} from '../service/calendar.service';

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
  inquiryentries;
  title = 'Appointments & Inquiries';
  headElementsAppointments = ['Appointment', 'Time', 'Username', 'First Name', 'Last Name', 'Status'];
  sortHeaders = ['appointmentDate', 'appointmentTime', 'username', 'name', 'lastName', 'fixed']; //defines which property belongs to which header
  order = 1; // defines if sorting is descending or ascending
  searchList = ['username', 'name', 'lastName']; //defines which properties of the appointments should be filtered

  constructor(private calendarService: CalendarService,private appointmentService: AppointmentService, private router: Router, private inquiryService: InquiryService,
              private toastr: ToastrService) {
  }

  ngOnInit() {

    this.getRoleAndUsername();

    this.appointmentService.getAllEntries()
      .subscribe((appointments: any) => {
        this.appointments = appointments;
      });


  }

  getRoleAndUsername() { // looks which role the logged in user has
    this.tokenDecoder = new JwtHelperService();
    this.username = localStorage.getItem('username');
    this.token = this.tokenDecoder.decodeToken(localStorage.getItem('access_token'));
    if (this.token['authorities'].includes('ROLE_ADMIN')) {
      this.isAdmin = true;
      this.isEmployee = true;
    } else if (this.token['authorities'].includes('ROLE_EMPLOYEE')) {
      this.isEmployee = true;
    }

    this.inquiryService.getAll()
      .subscribe((inquiryentries: any) => {
        this.inquiryentries = inquiryentries;
      });

  }

  deleteAppointment(id) {


    this.appointmentService.delete(id).subscribe(() => {
      this.ngOnInit();
      this.toastr.info('You sucessfully deleted your Appointment', 'Deletion of Appointment');
    });


  }

  goToAppointmentForm(id) {
    this.calendarService.getAll()
      .subscribe((entries:any) => {
        localStorage.setItem('calendarEntries',JSON.stringify(entries));
        if (id) {
          this.router.navigate(['/appointment-doctor-form/' + id]); //create an appointment that belongs to an inquiry
        }else{
          this.router.navigate(['/appointment-doctor-form/']); // create an appointment that doesn't belong to an inquiry
        }
      });

  }

  sortTable(prop: string) { //function to sort the table. prop: after which property the table should be sorted
    const property = this.firstLetterToLower(prop);
    this.appointments.sort((a, b) => {
      if (typeof a[property] === 'string') {
        return (a[property] === b[property]) ? 0 : a[property] > b[property] ? (1 * this.order) : (-1 * this.order);
      }
      if (typeof a[property] === 'boolean') {
        return (a[property] === b[property]) ? 0 : a[property] ? (this.order * -1) : (1 * this.order);
      }
      if (typeof a[property] === 'number') {
        return (a[property] === b[property]) ? 0 : a[property] > b[property] ? (this.order * -1) : (1 * this.order);
      }
    });
    this.order = this.order * -1;

    return false; // prevents the page from reloading
  }

  firstLetterToLower(string) {
    return string.slice(0, 1).toLowerCase() + string.slice(1);
  }

}
