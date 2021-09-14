import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as LossReportActions from './loss-report.actions';
import { LossReport } from '../../entities/loss-report';

export const LOSSREPORT_FEATURE_KEY = 'luggage-lossReport';

export interface State extends EntityState<LossReport> {
  selectedId ?: string | number;          // which LossReport record has been selected
  loaded      : boolean;                  // has the LossReport list been loaded
  error      ?: string | null;            // last known error (if any)
}

export interface LossReportPartialState {
  readonly [LOSSREPORT_FEATURE_KEY]: State;
}

export const lossReportAdapter: EntityAdapter<LossReport> = createEntityAdapter<LossReport>();

export const initialState: State = lossReportAdapter.getInitialState({
  // set initial required properties
  loaded : false
});

const lossReportReducer = createReducer(
  initialState,
  on(LossReportActions.loadLossReport,
    state => ({ ...state, loaded: false, error: null })
  ),
  on(LossReportActions.loadLossReportSuccess,
    (state, { lossReport }) => lossReportAdapter.upsertMany(lossReport, { ...state, loaded: true })
  ),
  on(LossReportActions.loadLossReportFailure,
    (state, { error }) => ({ ...state, error })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return lossReportReducer(state, action);
}
