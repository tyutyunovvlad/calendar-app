import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events = {}
  private eventsComponentCallerSource = new BehaviorSubject(true)
  eventsComponentCaller = this.eventsComponentCallerSource.asObservable()

  constructor() { }

  addEvent(text: string, date: Date) {
    if (!this.events[`${date}`]) {
      this.events[`${date}`] = []
    }
    this.events[`${date}`].push(text)
    this.eventsComponentCallerSource.next(true)
  }

  getEvent(date: Date) {
    if (this.events[`${date}`]) {
      return this.events[`${date}`]
    } else {
      return null
    }
  }

}
