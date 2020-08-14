import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromApp from './app.reducer';
import * as AppActions from './app.actions';
import { CalendarService } from '../../services/calendar.service';

@Injectable()
export class AppEffects {
  loadApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadApp),
      fetch({
        run: (action) => {
          return AppActions.loadAppSuccess({ app: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AppActions.loadAppFailure({ error });
        },
      })
    )
  );

  loadAppSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadAppSuccess),
      fetch({
        run: (action) => {
          ///
        },
      })
    )
  );

  changeDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.changeDate),
      fetch({
        run: (action) => {
          this.calendarService.effectSetDate(action.date)
        },
      })
    )
  );

  constructor(private actions$: Actions, private calendarService: CalendarService) {}
}
