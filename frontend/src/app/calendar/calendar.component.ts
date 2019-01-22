import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {AppointmentService} from '../service/appointment.service';
import {Appointment} from '../api/appointment';
import {UserService} from '../service/user.service';
import {User} from '../api/user';
import {CalendarService} from '../service/calendar.service';
import * as moment from 'moment';
import {jsonpCallbackContext} from '@angular/common/http/src/module';
import {forEach} from '@angular/router/src/utils/collection';
import {ControlValueAccessor} from '@angular/forms';

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
      end: '2019-01-11T13:00:00.000',
      color: 'green'
    }
  ];

  appointments: Array<Appointment>;
  users: Array<User>;
  calendarEntries = [];

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private ref: ChangeDetectorRef, private calendarService: CalendarService, private appointmentService: AppointmentService) {
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
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: this.data
    };

    this.addData(this.calendarEntries);
    this.calendarService.getAll()
      .subscribe((entries: any) => {

        this.calendarEntries = entries;
        this.addData(this.calendarEntries);
        //location.reload();

      });



  }


  clickDay(details) {
    let detailStringList = Object.values(details).toString().split(' ');
    detailStringList = detailStringList.splice(1,3);
    let dateString = detailStringList[2] + '-' + this.monthStringToNumber(detailStringList[0]) + '-' + detailStringList[1];

    let viewNameList = ['month', 'agendaWeek', 'agendaDay'];

    let view = this.ucCalendar.fullCalendar('getView');

    let viewName = viewNameList[viewNameList.indexOf(view.name) + 1 ];

    this.ucCalendar.fullCalendar('changeView', viewName);
    this.ucCalendar.fullCalendar('gotoDate', dateString);

  }

  addData (entries:Array<any>) {
    for (let entry of entries) {

      let startDate: Date = new Date(entry.appointmentDate);

      const hour: number = Math.floor(entry.appointmentTime / 100);

      const minute: number = entry.appointmentTime - (Math.floor(entry.appointmentTime / 100) * 100);
      startDate.setHours(hour);
      startDate.setMinutes(minute);

      let endDate = new Date(startDate.getTime() + 1000 * 60 * 60);

      const colorString: string = entry.fixed ? '#009be6' : '#ff4000';

      this.data.push(
        {
          title: entry.name + ' ' + entry.lastName,
          start: startDate.toString(),
          end: endDate.toString(),
          color: colorString
        }
      );
    }
  }

  monthStringToNumber(string: String){
    let months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

    let monthNumber: String = (months.indexOf(string.toLowerCase()) + 1).toString();
    if(monthNumber.length < 2) monthNumber = '0' + monthNumber;

    return monthNumber;
  }


}
