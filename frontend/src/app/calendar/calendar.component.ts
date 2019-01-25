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

  //data that is shown in the calendar
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
    //settings for the calendar
    this.calendarOptions = {
      editable: false, //if you can move the entries per drag and drop
      eventLimit: false, //if the events shown per day are limited
      selectable: true, //if you can select multiple days at once
      nowIndicator: true, //if the current time is shown in the day view
      locale: 'en', //language of the calendar
      timeFormat: 'H:mm',
      fixedWeekCount: false, //if 6 weeks per month are shown or not
      firstDay: 1, //which day is the first of the week. 0=Sunday, 6=Saturday
      minTime: moment.duration("06:00:00"), //what is the first hour shown
      maxTime: moment.duration("21:00:00"), //what is the last hour shown
      header: { //what is shown in the header of the calendar
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: this.data //which data is used for the events
    };

    //loads data from the localstorage and deletes it afterwards (for performance reasons if the component is used inside another component)
    if(localStorage.getItem('calendarEntries')) {
      this.calendarEntries = JSON.parse(localStorage.getItem('calendarEntries'));
      this.addData(this.calendarEntries);
      localStorage.removeItem('calendarEntries')
    }
    // see addData
    this.calendarService.getAll()
      .subscribe((entries: any) => {
        this.calendarEntries = entries;
        for (let entry of this.calendarEntries) {

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
            });
        }
      });
  }


  clickDay(details) {
    let detailStringList = Object.values(details).toString().split(' ');
    detailStringList = detailStringList.splice(1,3); //get relevant data (day,month,year)
    let dateString = detailStringList[2] + '-' + this.monthStringToNumber(detailStringList[0]) + '-' + detailStringList[1]; //create a dateString that is used for fullcalendar functions

    let viewNameList = ['month', 'agendaWeek', 'agendaDay'];

    let view = this.ucCalendar.fullCalendar('getView'); //current view of the calendar

    let viewName = viewNameList[viewNameList.indexOf(view.name) + 1 ]; //name of the next view

    this.ucCalendar.fullCalendar('changeView', viewName); //changing view
    this.ucCalendar.fullCalendar('gotoDate', dateString); //changing date

  }

  //an array of appointment is converted into fullcalendar events and those are added to the data
  addData (entries:Array<any>) {
    for (let entry of entries) {

      let startDate: Date = new Date(entry.appointmentDate); //startDate of an event

      const hour: number = Math.floor(entry.appointmentTime / 100);

      const minute: number = entry.appointmentTime - (Math.floor(entry.appointmentTime / 100) * 100);
      startDate.setHours(hour);
      startDate.setMinutes(minute);

      let endDate = new Date(startDate.getTime() + 1000 * 60 * 60); //endDate = startDate + 1 hour

      const colorString: string = entry.fixed ? '#009be6' : '#ff4000'; //color of the entry depends on whether it is fixed or not

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
