import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as LuggageActions from './luggage.actions';
import { Luggage } from '../../entities/luggage';

export const LUGGAGE_FEATURE_KEY = 'luggage-luggage';

export interface State extends EntityState<Luggage> {
  selectedId ?: string | number;          // which Luggage record has been selected
  loaded      : boolean;                  // has the Luggage list been loaded
  error      ?: string | null;            // last known error (if any)
}

export interface LuggagePartialState {
  readonly [LUGGAGE_FEATURE_KEY]: State;
}

export const luggageAdapter: EntityAdapter<Luggage> = createEntityAdapter<Luggage>();

export const initialState: State = luggageAdapter.getInitialState({
  // set initial required properties
  loaded : false
});

const luggageReducer = createReducer(
  initialState,
  on(LuggageActions.loadLuggage,
    state => ({ ...state, loaded: false, error: null })
  ),
  on(LuggageActions.loadLuggageSuccess,
    (state, { luggage }) => luggageAdapter.upsertMany(luggage, { ...state, loaded: true })
  ),
  on(LuggageActions.loadLuggageFailure,
    (state, { error }) => ({ ...state, error })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return luggageReducer(state, action);
}
