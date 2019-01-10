import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActorFormComponent} from './actor-form/actor-form.component';
import {ActorListComponent} from './actor-list/actor-list.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {AppointmentPatientFormComponent} from './appointment-patient-form/appointment-patient-form.component';
import {AppointmentPatientListComponent} from './appointment-patient-list/appointment-patient-list.component';
import {AppointmentDoctorListComponent} from './appointment-doctor-list/appointment-doctor-list.component';


import {MedicineComponent} from './medicine/medicine.component';
import {MedicineFormComponent} from './medicine-form/medicine-form.component';

import {MyCalendarComponent} from './calendar/calendar.component';



const routes: Routes = [
  {
    path: '', redirectTo: '/actor-list', pathMatch: 'full'
  },
  {
    path: 'actor-form', component: ActorFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'actor-form/:id', component: ActorFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'actor-list', component: ActorListComponent, canActivate: [AuthGuard]
  },

  ///////////////////////////////////////////////////////////////////////////
  {
    path: 'medicine', component: MedicineComponent, canActivate: [AuthGuard]
  },
  {
    path: 'medicine-form', component: MedicineFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'medicine-form/:id', component: MedicineFormComponent, canActivate: [AuthGuard]
  },
  ///////////////////////////////////////////////////////////////////////////
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'appointment-patient-form', component: AppointmentPatientFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'appointment-patient-list', component: AppointmentPatientListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'appointment-doctor-list', component: AppointmentDoctorListComponent, canActivate: [AuthGuard]
  },

  {
    path: 'calendar', component: MyCalendarComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
