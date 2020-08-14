import { createAction, props } from '@ngrx/store';
import { AppEntity, IDate } from './app.models';

export const loadApp = createAction('[App] Load App');

export const loadAppSuccess = createAction(
  '[App] Load App Success',
  props<{ app: AppEntity[] }>()
);

export const loadAppFailure = createAction(
  '[App] Load App Failure',
  props<{ error: any }>()
);


export const changeDate = createAction(
  '[App] Change Date',
  props<{date:IDate}>()
);

export const addEvent = createAction(
  '[App] Add Event',
  props<{text:string, date: Date}>()
)
