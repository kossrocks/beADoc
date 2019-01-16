import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActorFormComponent} from './actor-form/actor-form.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import {ActorListComponent} from './actor-list/actor-list.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';
import {EmployeeGuard} from './employee.guard';
import {AppointmentPatientFormComponent} from './appointment-patient-form/appointment-patient-form.component';
import {AppointmentPatientListComponent} from './appointment-patient-list/appointment-patient-list.component';
import {AppointmentDoctorListComponent} from './appointment-doctor-list/appointment-doctor-list.component';
import {MedicineComponent} from './medicine/medicine.component';
import {MedicineFormComponent} from './medicine-form/medicine-form.component';
import {MyCalendarComponent} from './calendar/calendar.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {EditGuard} from './edit.guard';
import {QuestionaireComponent} from './questionaire/questionaire.component';
import {AppointmentDoctorFormComponent} from './appointment-doctor-form/appointment-doctor-form.component';


/*
GUARDS EXPLAINED:

AuthGuard -> Only signed in people are allowed to use this path else forwarded to Login

EmployeeGuard -> Only Employees are able to use this Path else forwarded to Home

AdminGuard -> Only Admins are able to use this Path else forwarded to Home

EditGuard -> Every called link that contains a id meaning a reference to a profile will forward all non moderator user (non employees) to home if the called id does not match their own
Example: Signed in User tester with ID 1
Tries to call /user-form/1 suceeds gets forwarded
Tries to call /user-form/2 fails gets routed to /home

 */
const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: MainpageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'appointment-patient-form', component: AppointmentPatientFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'appointment-patient-list', component: AppointmentPatientListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-form/:id', component: UserFormComponent, canActivate: [AuthGuard, EditGuard]
  },
  {
    path: 'questionaires/:id', component: QuestionaireComponent, canActivate: [AuthGuard, EditGuard]
  },
  /////////// EMPLOYEE and ADMIN ONLY ///////////////
  {
    path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard, EmployeeGuard]
  },
  {
    path: 'user-list/:id', component: UserListComponent, canActivate: [AuthGuard, EmployeeGuard]
  },
  {
    path: 'medicine-list', component: MedicineComponent, canActivate: [AuthGuard, EmployeeGuard]
  },
  {
    path: 'appointment-doctor-list', component: AppointmentDoctorListComponent, canActivate: [AuthGuard, EmployeeGuard]
  },
  {
    path: 'calendar', component: MyCalendarComponent, canActivate: [AuthGuard, EmployeeGuard]
  },
  {
    path: 'appointment-doctor-form', component: AppointmentDoctorFormComponent, canActivate: [AuthGuard, EmployeeGuard]
  },
  ///// ADMIN ONLY ////////////
  {
    path: 'medicine-form', component: MedicineFormComponent, canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'medicine-form/:id', component: MedicineFormComponent, canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
