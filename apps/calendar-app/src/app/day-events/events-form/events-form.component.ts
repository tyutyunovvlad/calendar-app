import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service'
import { CalendarService, IDate } from '../../services/calendar.service';

@Component({
  selector: 'calendar-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent implements OnInit {
  eventText: string
  selectedDate: Date

  constructor(private eventsService: EventsService, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.selectedDate.subscribe((date:IDate) => {
      this.selectedDate = new Date(date.year, date.month, date.day)
    })
  }

  addEvent() {
    if (this.eventText.trim().length) {
      this.eventsService.addEvent(this.eventText, this.selectedDate)
      this.eventText = ''
    }
  }
}
