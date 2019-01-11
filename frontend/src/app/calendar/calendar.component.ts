import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent } from 'ng-fullcalendar';
import {Options} from 'fullcalendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class MyCalendarComponent implements OnInit {

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor() {}
  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      selectable: true,
      nowIndicator: true,
      locale: 'en',
      timeFormat: 'H:mm',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [
        {
          title: 'Test Event',
          start: '2019-01-11T12:00:00.000',
          end: '2019-01-11T13:00:00.000'
        }
      ]
    };
  }

}
