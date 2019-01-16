import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient, private router: Router) { }

  getAll() {
    return this.http.get('/api/dto/calendarentries');
  }
}
