import { Component, OnInit } from '@angular/core';
import { CalendarService, IDate } from '../services/calendar.service';

@Component({
  selector: 'calendar-day-events',
  templateUrl: './day-events.component.html',
  styleUrls: ['./day-events.component.css']
})
export class DayEventsComponent implements OnInit {
  date: IDate
  formatedDate: Date
  dayName: string

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.selectedDate.subscribe((date: IDate) => {
      this.date = date
      this.formatedDate = new Date(date.year,date.month,date.day)
    })
  }

}
