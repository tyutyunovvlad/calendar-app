import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  selectedYear = this.currentDate.year
  selectedMonth = this.currentDate.month
  selectedDay = this.currentDate.day

  private dateSource = new BehaviorSubject<IDate>({year: this.selectedYear, month: this.selectedMonth, day: this.selectedDay})
  selectedDate = this.dateSource.asObservable()
  private calendarSouce = new BehaviorSubject([])
  currentCalendar = this.calendarSouce.asObservable()


  constructor() {



  }

  init() {
    this.selectedDate.subscribe((date) => {
      this.drawCalendar(date.year, date.month)
    })
  }

  changeMonth(month: number) {
    this.selectedMonth = month
    this.refreshDateSource()
  }

  changeYear(direction: number) {
    this.selectedYear += direction
    this.refreshDateSource()
  }

  selectDay(day:number) {
    this.selectedDay = day
    this.refreshDateSource()
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

    //////////////////
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
    //////////////////

    this.calendarSouce.next(table)
  }

  private getDay(date) {
    let day = date.getDay()
    if (day === 0) day = 7
    return day
  }

  private refreshDateSource() {
    this.dateSource.next({year: this.selectedYear, month: this.selectedMonth, day: this.selectedDay})

  }
}
