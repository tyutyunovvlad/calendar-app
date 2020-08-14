import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AppActions from './app.actions';
import { AppEntity } from './app.models';
import { IDate } from '../../services/calendar.service';

export const APP_FEATURE_KEY = 'app';

export interface State extends EntityState < AppEntity > {
  selectedId? : string | number; // which App record has been selected
  loaded: boolean; // has the App list been loaded
  error? : string | null; // last known error (if any)
  date: IDate;
  events: object
}

export interface AppPartialState {
  readonly[APP_FEATURE_KEY]: State;
}

export const appAdapter: EntityAdapter < AppEntity > = createEntityAdapter <
  AppEntity >
  ();

export const initialState: State = appAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  date: null,
  events: {}
});

const appReducer = createReducer(
  initialState,
  on(AppActions.loadApp, (state) => ({
    ...state,
    loaded: false,
    error: null,
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    }
  })),
  on(AppActions.loadAppSuccess, (state, {app}) =>
    appAdapter.addAll(app, {
      ...state,
      loaded: true
    })
  ),
  on(AppActions.loadAppFailure, (state, {error}) => ({
    ...state,
    error
  })),

  on(AppActions.changeDate, (state, {date}) => ({
    ...state,
    date: date
  })),

  on(AppActions.addEvent, (state, {text, date}) => {
    // if (!state.events[`${date}`]) {
    //   state.events[`${date}`] = []
    // }
    // state.events[`${date}`].push(text)
      return {...state}
    }),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
