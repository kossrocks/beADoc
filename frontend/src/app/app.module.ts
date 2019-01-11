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

import { AppointmentDoctorListComponent } from './appointment-doctor-list/appointment-doctor-list.component';
import { AppointmentPatientFormComponent } from './appointment-patient-form/appointment-patient-form.component';
import { AppointmentPatientListComponent } from './appointment-patient-list/appointment-patient-list.component';


import { MedicineComponent } from './medicine/medicine.component';
import { MedicineFormComponent } from './medicine-form/medicine-form.component';

import {CommonModule} from '@angular/common';
import { MyCalendarComponent } from './calendar/calendar.component';
import {FullCalendarModule} from 'ng-fullcalendar';

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
    AppointmentDoctorListComponent,
    AppointmentPatientFormComponent,
    AppointmentPatientListComponent,
    MedicineComponent,
    MedicineFormComponent,
    MyCalendarComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
