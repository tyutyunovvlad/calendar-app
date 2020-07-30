import { Component, OnInit } from '@angular/core';
import { CalendarService, IDate } from '../../services/calendar.service';

@Component({
  selector: 'calendar-year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.css']
})
export class YearSelectComponent implements OnInit {

  selectedYear = 2020

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.selectedDate.subscribe((date: IDate) => {
      this.selectedYear = date.year
    })
  }

  changeYear(direction: number) {
    this.calendarService.changeYear(direction)
  }

}
