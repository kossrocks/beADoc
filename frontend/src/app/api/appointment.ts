import {User} from './user';

export interface Appointment {
  id?: number;
  appointmentDate: Date;
  appointmentTime: Date;
  fixed: boolean;
  patient: number;
}
