import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {AppointmentService} from '../service/appointment.service';
import {Appointment} from '../api/appointment';
import {UserService} from '../service/user.service';
import {User} from '../api/user';

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

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private appointmentService: AppointmentService, private userService: UserService) {
  }


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
      events: this.data
    };

    this.appointmentService.getAll()
      .subscribe((appointments: any) => {
        this.appointments = appointments;
        for(let appointment of this.appointments){

          let timeString: string = appointment.appointmentTime.toString();

          while (timeString.length < 4){
            timeString = '0' + timeString;
          }

          let hourString: string = timeString.substring(0,2);
          let minuteString: string = timeString.substring(2,4);

          let timeInMinutes = parseInt(hourString) * 60 + parseInt(minuteString);
          timeInMinutes += 60;

          let newHourString: string = Math.floor(timeInMinutes/60).toString();
          while (newHourString.length < 2){
            newHourString = '0' + newHourString;
          }
          let newMinuteString: string = (timeInMinutes % 60).toString();
          while (newMinuteString.length < 2){
            newMinuteString = '0' + newMinuteString;
          }


          let startString: string = appointment.appointmentDate + 'T' + hourString + ':' + minuteString + ':00.000';


          let endString: string = appointment.appointmentDate + 'T' + newHourString + ':' + newMinuteString + ':00.000';


          this.data.push(
            {
              title: appointment.id.toString(),
              start: startString,
              end: endString
            }
          )
        }
      });


    this.userService.getAll()
      .subscribe((appointments: any) => {
        this.users = appointments;
      });



  }


}
