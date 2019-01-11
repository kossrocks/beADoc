import {User} from './user';

export interface Medicine {
  id?: number;
  name: string;
  consumers?: Array<any>;
  dosage?: string;
  sideEffects?: string;

}
