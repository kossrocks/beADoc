import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLinkActive} from '@angular/router';
import {Actor} from '../api/actor';
import {Inquiry} from '../api/inquiry';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient, private router: Router) { }

  getAll() {
    return this.http.get('/api/dto/inquiryentries');
  }

  create(inquiry: Inquiry) {
    return this.http.post('/api/dto/inquirys', inquiry);
  }

  delete(inquiry) {
    return this.http.delete('/api/inquirys/' + inquiry.id);
  }


  getById(id: string) {
    return this.http.get('/api/dto/inquirys/' + id)/*.pipe(map((res: any) => {
      if (res.dayOfCreation) {
        res.dayOfCreation = new Date(res.dayOfCreation);
      }
      return res;
    }))*/;
  }
}
