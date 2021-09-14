import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadLuggage } from '../+state/luggage/luggage.actions';
import * as fromLuggage from '../+state/luggage/luggage.reducer';
import * as LuggageSelectors from '../+state/luggage/luggage.selectors';

@Injectable({ providedIn: 'root' })
export class CheckinFacade {
  loaded$ = this.store.pipe(select(LuggageSelectors.getLuggageLoaded));
  luggageList$ = this.store.pipe(select(LuggageSelectors.getAllLuggage));
  selectedLuggage$ = this.store.pipe(select(LuggageSelectors.getSelected));

  constructor(private store: Store<fromLuggage.LuggagePartialState>) { }

  load(): void {
    this.store.dispatch(loadLuggage());
  }
}
