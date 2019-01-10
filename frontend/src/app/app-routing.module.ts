import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActorFormComponent} from './actor-form/actor-form.component';
import {ActorListComponent} from './actor-list/actor-list.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {AppointmentFormComponent} from './appointment-form/appointment-form.component';
import {AppointmentListComponent} from './appointment-list/appointment-list.component';
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
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'appointment-form', component: AppointmentFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'appointment-list', component: AppointmentListComponent, canActivate: [AuthGuard]
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
