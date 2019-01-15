import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {AppointmentService} from '../service/appointment.service';
import {Appointment} from '../api/appointment';
import {UserService} from '../service/user.service';
import {User} from '../api/user';
import {CalendarService} from '../service/calendar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class MyCalendarComponent implements OnInit {

  data = [
    {
      title: 'Test Event',
      start: '2019-01-11T12:00:00.000',
      end: '2019-01-11T13:00:00.000'
    }
  ];

  appointments: Array<Appointment>;
  users:Array<User>;
  calendarEntries;

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private calendarService: CalendarService, private appointmentService: AppointmentService) {
  }


  ngOnInit() {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      selectable: true,
      nowIndicator: true,
      locale: 'en',
      timeFormat: 'H:mm',
      minTime: moment.duration("06:00:00"),
      maxTime: moment.duration("21:00:00"),
      dayClick: (date, jsEvent, view) => this.clickDay(date, jsEvent, view),
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: this.data
    };

    this.calendarService.getAll()
      .subscribe((entries: any) => {
        this.calendarEntries = entries;
        this.addData(this.calendarEntries);

      });



  }

  clickDay(date, jsEvent, view){
    alert('works');
  }

  addData(entries:Array<any>){
    for(let entry of entries){

      let startDate: Date = new Date(entry.appointmentDate);

      let endDate = new Date(startDate.getTime() + 1000*60*60);

      this.data.push(
        {
          title: entry.name + ' ' + entry.lastName,
          start: startDate.toString(),
          end: endDate.toString()
        }
      )
    }
  }


}
