import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLinkActive} from '@angular/router';
import {Actor} from '../api/actor';
import {Inquiry} from '../api/inquiry';

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
}
