import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Appointment} from '../api/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getById(id: string) {
    return this.http.get('/api/dto/appointments/' + id);
  }

  getAll() {
    return this.http.get('/api/appointments').pipe(
      map((response: any) => {
        return response._embedded.appointments;
      })
    );
  }

  delete(appointment) {
    return this.http.delete('/api/appointments/' + appointment.id);
  }

  update(appointment: Appointment) {
    return this.http.put('/api/dto/appointments/' + appointment.id, appointment);
  }

  create(appointment: Appointment) {
    return this.http.post('/api/dto/appointments', appointment);
  }
}
