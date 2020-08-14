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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromApp from './+state/app/app.reducer';
import { AppEffects } from './+state/app/app.effects';
import { AppFacade } from './+state/app/app.facade';

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
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(
      fromApp.APP_FEATURE_KEY,
      fromApp.reducer
    ),
    EffectsModule.forFeature([AppEffects]),
    StoreModule.forFeature(fromApp.APP_FEATURE_KEY, fromApp.reducer),
    EffectsModule.forFeature([AppEffects]),
  ],
  providers: [AppFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
