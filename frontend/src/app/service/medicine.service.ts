import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Medicine} from '../api/medicine';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) {
  }

  getById(id: string) {
    return this.http.get('/api/dto/medicines/' + id);
  }

  getAll() {
    return this.http.get('/api/medicines').pipe(
      map((response: any) => {
        return response._embedded.medicines;
      })
    );
  }

  delete(medicine) {
    return this.http.delete('/api/medicines/' + medicine.id);
  }

  update(medicine: Medicine) {
    return this.http.put('/api/dto/medicines/' + medicine.id, medicine);
  }

  create(medicine: Medicine) {
    return this.http.post('/api/dto/medicines', medicine);
  }

}
