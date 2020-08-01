import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DayEventsComponent } from './day-events/day-events.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsComponent } from './day-events/events/events.component';
import { EventsFormComponent } from './day-events/events-form/events-form.component';
import { YearSelectComponent } from './calendar/year-select/year-select.component';
import { DaysComponent } from './calendar/days/days.component';

@NgModule({
  declarations: [
    AppComponent,
    DayEventsComponent,
    CalendarComponent,
    EventsComponent,
    EventsFormComponent,
    YearSelectComponent,
    DaysComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
