import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLinkActive} from '@angular/router';
import {Inquiry} from '../api/inquiry';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  inquirySizeChange: Subject<boolean> = new Subject<boolean>(); //states if the size of the inquiries changed

  constructor(private http: HttpClient, private router: Router) { }

  getAll() {
    return this.http.get('/api/dto/inquiryentries');
  }

  create(inquiry: Inquiry) {
    return this.http.post('/api/dto/inquirys', inquiry);
  }

  delete(id) {
    return this.http.delete('/api/inquiries/' + id);
  }

  sizeChange(){
    this.inquirySizeChange.next(true);
  }

  getById(id: string) {
    return this.http.get('/api/dto/inquirys/' + id)
  }
}
