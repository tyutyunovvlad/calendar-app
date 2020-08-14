import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppFacade } from '../../+state/app/app.facade';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events = {}
  private eventsComponentCallerSource = new BehaviorSubject(true)
  eventsComponentCaller = this.eventsComponentCallerSource.asObservable()

  constructor(private appFacade: AppFacade) { }

  addEvent(text: string, date: Date) {
    if (!this.events[`${date}`]) {
      this.events[`${date}`] = []
    }
    this.events[`${date}`].push(text)
    this.eventsComponentCallerSource.next(true)

    console.log(this.events)
    this.appFacade.dispatchAddEvent({text,date})
  }

  getEvent(date: Date) {
    if (this.events[`${date}`]) {
      return this.events[`${date}`]
    } else {
      return null
    }
  }

}
