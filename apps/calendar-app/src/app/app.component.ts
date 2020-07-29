import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'calendar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  AVAILABLE_WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  localStorageName = 'calendar-events';
  options = {id:'calendar', maxDays: 37}
  elements
  eventList
  date
  day
  selectedYear
  selectedMonth
  currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  }

      constructor() {

          this.eventList = JSON.parse(localStorage.getItem(this.localStorageName)) || {};

          this.date = +new Date(2000,12);

      }

      ngOnInit() {
        const calendar = document.querySelector('.calendar-day-list')
        const curDate = new Date()
        this.selectedYear = this.currentDate.year
        this.selectedMonth = this.currentDate.month
        this.drawCalendar(calendar, this.selectedYear, this.selectedMonth)

        document.querySelector('.calendar-month').addEventListener('click', event => {
          const month = (<HTMLElement>event.target).dataset.month
          this.selectedMonth = month
          this.drawCalendar(calendar, this.selectedYear, this.selectedMonth)
        })
        document.querySelector('.calendar-change-year-slider-prev').addEventListener('click', () => {
          this.selectedYear--;
          this.drawCalendar(calendar, this.selectedYear, this.selectedMonth)
        })
        document.querySelector('.calendar-change-year-slider-next').addEventListener('click', () => {
          this.selectedYear++;
          this.drawCalendar(calendar, this.selectedYear, this.selectedMonth)
        })

      }





      drawCalendar(elem, year, month) {
        month = +month
        let date = new Date(year, month);
        let table = '<ul class="calendar-days">'
        let day
        if (year === this.currentDate.year && month === this.currentDate.month) {
          day = this.currentDate.day
        }

        const iters = this.getDay(date);
        date.setDate(date.getDate() - this.getDay(date))

        for (let i = 0; i < iters; i++) {
          table += `<li class="another-month">${date.getDate()} </li>`;
          date.setDate(date.getDate()+1);
        }
        date = new Date(year,month);

        while (date.getMonth() === month) {
          table += `<li data-day="${date.getDate()}">` + date.getDate() + '</li>';

          date.setDate(date.getDate() + 1);
        }

        if (this.getDay(date) !== 0) {
          let j = 1
          for (let i = this.getDay(date); i < 7; i++) {
            table += `<li class="another-month">${j}</li>`;
            j++;
          }
        }
        table += '</ul>';
        elem.innerHTML = table;

        document.querySelectorAll(`[data-month]`).forEach((el: HTMLElement) => {
          if(el.dataset.month === month){
            el.classList.add('active')
          } else {
            el.classList.remove('active')
          }
        })
        document.querySelectorAll('[data-day]').forEach((el: HTMLElement) => {
          if(+el.dataset.day === day) {
            el.classList.add('active-day')
          } else {
            el.classList.remove('active-day')
          }
        })
        document.querySelector('.calendar-current-year').innerHTML = `${year}`
      }

      getDay(date) {
        let day = date.getDay()
        if (day === 0) day = 7
        return day
      }
  }




