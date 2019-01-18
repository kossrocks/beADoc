import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ActorFormComponent} from './actor-form/actor-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActorListComponent} from './actor-list/actor-list.component';
import {JwtModule} from '@auth0/angular-jwt';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RatingModule} from 'ngx-bootstrap/rating';
import {NgxSelectModule} from 'ngx-select-ex';
import {BsDatepickerModule} from 'ngx-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import {MediainputComponent} from './mediainput/mediainput.component';
import {SafeUrlPipe} from './service/safe-url.pipe';
import { MainpageComponent } from './mainpage/mainpage.component';

import { AppointmentDoctorListComponent } from './appointment-doctor-list/appointment-doctor-list.component';
import { AppointmentPatientFormComponent } from './appointment-patient-form/appointment-patient-form.component';
import { AppointmentPatientListComponent } from './appointment-patient-list/appointment-patient-list.component';


import { MedicineComponent } from './medicine/medicine.component';
import { MedicineFormComponent } from './medicine-form/medicine-form.component';

import {CommonModule} from '@angular/common';
import { MyCalendarComponent } from './calendar/calendar.component';
import {FullCalendarModule} from 'ng-fullcalendar';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AppointmentDoctorFormComponent } from './appointment-doctor-form/appointment-doctor-form.component';
import { QuestionaireComponent } from './questionaire/questionaire.component';
import { UserInfoComponent } from './user-info/user-info.component';

import { UserService } from './service/user.service';
import {FilterPipe} from './pipes/filter.pipe';

defineLocale('de', deLocale);


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ActorFormComponent,
    ActorListComponent,
    LoginComponent,
    LogoutComponent,
    MediainputComponent,
    SafeUrlPipe,
    MainpageComponent,
    AppointmentDoctorListComponent,
    AppointmentPatientFormComponent,
    AppointmentPatientListComponent,
    MedicineComponent,
    MedicineFormComponent,
    MyCalendarComponent,
    UserListComponent,
    FilterPipe,

    UserFormComponent,

    QuestionaireComponent,

    AppointmentDoctorFormComponent,

    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    FullCalendarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    RatingModule.forRoot(),
    NgxSelectModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
