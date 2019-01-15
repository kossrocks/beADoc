import {User} from './user';

export interface Appointment {
  id?: number;
  appointmentDate: Date;
  appointmentTime: string;
  fixed: boolean;
  patient: number;
}
