import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppFacade } from '../+state/app/app.facade';
import { take } from 'rxjs/operators';

export interface IDate {
  year: number,
  month: number,
  day: number
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  currentDate: IDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  }

  private dateSource = new BehaviorSubject<IDate>({year: this.currentDate.year, month: this.currentDate.month, day: this.currentDate.day})
  selectedDate = this.dateSource.asObservable()
  private calendarSouce = new BehaviorSubject([])
  currentCalendar = this.calendarSouce.asObservable()


  constructor(private appFacade: AppFacade) {
  }

  init() {
    this.selectedDate.subscribe((date) => {
      this.drawCalendar(date.year, date.month)
    })
  }

  changeMonth(newMonth: number) {
    this.selectedDate.pipe(take(1)).subscribe((date: IDate) => {
      this.appFacade.dispatchChangeDate({year: date.year, month: newMonth, day: date.day})
    })
  }
  changeYear(direction: number) {
    this.selectedDate.pipe(take(1)).subscribe((date: IDate) => {
      let newYear = date.year + direction
      this.appFacade.dispatchChangeDate({year: newYear, month: date.month, day: date.day})
    })
  }
  selectDay(newDay:number) {
    this.selectedDate.pipe(take(1)).subscribe((date: IDate) => {
      this.appFacade.dispatchChangeDate({year: date.year, month: date.month, day: newDay})
    })
  }


  effectSetDate(date: IDate) {
    this.dateSource.next(date)
  }

  private drawCalendar(year, month) {
    const elem = document.querySelector('.calendar-day-list')
    month = +month
    let date = new Date(year, month);
    let table = [];
    let day
    if (year === this.currentDate.year && month === this.currentDate.month) {
      day = this.currentDate.day
    }

    const iters = this.getDay(date);
    date.setDate(date.getDate() - this.getDay(date))

    for (let i = 0; i < iters; i++) {
      let dayNumber = date.getDate()
      table.push([dayNumber, 'another-month']);
      date.setDate(date.getDate()+1);
    }
    date = new Date(year,month);
    while (date.getMonth() === month) {
      let dayNumber = date.getDate()
      table.push([dayNumber, '']);

      date.setDate(date.getDate() + 1);
    }
    if (this.getDay(date) !== 0) {
      let dayNumber = 1
      for (let i = this.getDay(date); i < 7; i++) {
        table.push([dayNumber, 'another-month']);
        dayNumber++;
      }
    }

    this.calendarSouce.next(table)
  }

  private getDay(date) {
    let day = date.getDay()
    if (day === 0) day = 7
    return day
  }

}
