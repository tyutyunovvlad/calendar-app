import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'

import * as AppReducer from './app.reducer'
import * as AppSelectors from './app.selectors'
import * as AppActions from './app.actions'
import { IDate } from './app.models'

@Injectable()
export class AppFacade {
  // isLoading$ = this.store.pipe(select(AuthSelectors.getIsLoading))

  constructor(
    private store: Store<AppReducer.AppPartialState>,
  ) {}


  dispatchLoadApp() {
    this.store.dispatch(AppActions.loadApp())
  }

  dispatchChangeDate(date: IDate) {
    this.store.dispatch(AppActions.changeDate({date}))
  }

  dispatchAddEvent(event) {
    console.log(event)
    this.store.dispatch(AppActions.addEvent(event))
  }
}
