import {User} from './user';

export interface Medicine {
  id?: number;
  name: string;
  consumers?: Set<User>;
  dosage?: string;
  sideEffects?: string;

}
