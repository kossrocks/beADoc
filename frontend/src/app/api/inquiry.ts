import {User} from './user';

export interface Inquiry {
  id?: number;
  soon: boolean;
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  morning?: boolean;
  midday?: boolean;
  evening?: boolean;
  patient?: User;
  userId?: number;
  username?: string;
  name?: string;
  lastName?: string;
  dayOfCreation?: Date;
}
