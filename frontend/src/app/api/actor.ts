export interface Actor {
  id?: number;
  firstName: string;
  lastName: string;
  rating?: number;
  dayOfBirth?: Date;
  gender?: string;
  alive?: boolean;
  movies?: Array<any>;
}
