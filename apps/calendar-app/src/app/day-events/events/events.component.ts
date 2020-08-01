import { Component, OnInit, Input } from '@angular/core';
import { CalendarService, IDate } from '../../services/calendar.service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'calendar-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  selectedDate: Date
  events = {}

  constructor(
    private calendarService: CalendarService,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.calendarService.selectedDate.subscribe((date:IDate) => {
      this.selectedDate = new Date(date.year, date.month, date.day)
      this.events = this.eventsService.getEvent(this.selectedDate)
    })

    this.eventsService.eventsComponentCaller.subscribe(() => {
      this.events = this.eventsService.getEvent(this.selectedDate)
    })

  }

}
