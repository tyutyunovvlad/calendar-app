import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { throwError } from 'rxjs';
import { CalendarService } from './services/calendar.service';
import { AppFacade } from './+state/app/app.facade'

@Component({
  selector: 'calendar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  constructor(private calendarService: CalendarService, private appFacade: AppFacade) {
  }

  ngOnInit() {
    this.calendarService.init()

    this.appFacade.dispatchLoadApp()
  }

}




