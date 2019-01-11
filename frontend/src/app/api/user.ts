import {Appointment} from './appointment';
import {Medicine} from './medicine';

export interface User {
  id?: number;
  name?: string;
  lastName?: string;
  username: string;
  password: string;
  eMail?: string;
  dayOfBirth?: Date;
  appointments?: Array<any>;
  medicines?: Array<any>;
  admin?: boolean;
  employee?: boolean;
  active?: boolean;
  gender?: string;
}
