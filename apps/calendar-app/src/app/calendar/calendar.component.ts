import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'calendar-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  activeMonth = 0;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.selectedDate.subscribe((date) => {
      this.activeMonth = date.month
    })
  }


  changeMonth(event: Event) {
    const month = +(<HTMLElement>event.target).dataset.month
    this.calendarService.changeMonth(month);
  }

}
