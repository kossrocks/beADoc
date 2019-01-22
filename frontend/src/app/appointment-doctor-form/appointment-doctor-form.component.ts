import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppointmentService} from '../service/appointment.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {InquiryService} from '../service/inquiry.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-appointment-doctor-form',
  templateUrl: './appointment-doctor-form.component.html',
  styleUrls: ['./appointment-doctor-form.component.scss']
})
export class AppointmentDoctorFormComponent implements OnInit {

  patientOption;
  appointmentFormDoctor;
  inquiry;
  timeOption = [];
  id = '';

  constructor(private router: Router, private appointmentService: AppointmentService, private userService: UserService,
              private inquiryService: InquiryService, private route: ActivatedRoute, private toastr: ToastrService) { }


  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    if (id) {
      this.inquiryService.getById(id)
        .subscribe((response) => {
          this.inquiry = response;
        });
    }

    this.appointmentFormDoctor = new FormGroup({
      'appointmentDate': new FormControl([Validators.required]),
      'appointmentTime': new FormControl([Validators.required]),
      'patient': new FormControl([Validators.required]),
    });

    let x = 7;

    while (x < 21) {

      const string1: string = x.toString() + ':00';
      const string2: string = x.toString() + ':15';
      const string3: string = x.toString() + ':30';
      const string4: string = x.toString() + ':45';
      this.timeOption.push(string1);
      this.timeOption.push(string2);
      this.timeOption.push(string3);
      this.timeOption.push(string4);

      x += 1;
    }

    this.userService.getAll()
      .subscribe((patient: any) => {
        this.patientOption = patient;
      });
  }

  goBackToList() {
    this.router.navigate(['/appointment-doctor-list']);
  }

  createAppointment () {
    const appointment = this.appointmentFormDoctor.value;


    this.inquiryService.delete(this.id).subscribe(() => {

      this.appointmentService.create(appointment)
        .subscribe((response: any) => {
          this.toastr.success('You sucessfully created a new Appointment!', 'Creation of Appointment');
          this.goBackToList();
        });
    });


  }
}
