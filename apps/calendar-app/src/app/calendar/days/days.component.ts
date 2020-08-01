import { Component, OnInit } from '@angular/core';
import { CalendarService, IDate } from '../../services/calendar.service';

@Component({
  selector: 'calendar-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css'],
})
export class DaysComponent implements OnInit {
  currentDay = new Date().getDate();
  selectedDay = 0
  calendar = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.selectedDate.subscribe((date: IDate) => {
      if (
        date.month === this.calendarService.currentDate.month &&
        date.year === this.calendarService.currentDate.year
      ) {
        this.currentDay = new Date().getDate();
      } else {
        this.currentDay = 0;
      }

      this.selectedDay = date.day

    });

    this.calendarService.currentCalendar.subscribe((table) => {
      this.calendar = table;
    })
  }

  selectDay(day:number) {
    this.calendarService.selectDay(day)
  }
}
