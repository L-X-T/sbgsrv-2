import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOSSREPORT_FEATURE_KEY, State, LossReportPartialState, lossReportAdapter } from './loss-report.reducer';

// Lookup the 'LossReport' feature state managed by NgRx
export const getLossReportState = createFeatureSelector<LossReportPartialState, State>(LOSSREPORT_FEATURE_KEY);

const { selectAll, selectEntities } = lossReportAdapter.getSelectors();

export const getLossReportLoaded = createSelector(
  getLossReportState,
  (state: State) => state.loaded
);

export const getLossReportError = createSelector(
  getLossReportState,
  (state: State) => state.error
);

export const getAllLossReport = createSelector(
  getLossReportState,
  (state: State) => selectAll(state)
);

export const getLossReportEntities = createSelector(
  getLossReportState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getLossReportState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getLossReportEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
