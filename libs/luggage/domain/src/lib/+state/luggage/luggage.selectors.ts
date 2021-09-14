import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LUGGAGE_FEATURE_KEY, State, LuggagePartialState, luggageAdapter } from './luggage.reducer';

// Lookup the 'Luggage' feature state managed by NgRx
export const getLuggageState = createFeatureSelector<LuggagePartialState, State>(LUGGAGE_FEATURE_KEY);

const { selectAll, selectEntities } = luggageAdapter.getSelectors();

export const getLuggageLoaded = createSelector(
  getLuggageState,
  (state: State) => state.loaded
);

export const getLuggageError = createSelector(
  getLuggageState,
  (state: State) => state.error
);

export const getAllLuggage = createSelector(
  getLuggageState,
  (state: State) => selectAll(state)
);

export const getLuggageEntities = createSelector(
  getLuggageState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getLuggageState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getLuggageEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
