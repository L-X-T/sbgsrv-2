import { createAction, props } from '@ngrx/store';
import { LossReport } from '../../entities/loss-report';

export const loadLossReport = createAction(
  '[LossReport] Load LossReport'
);

export const loadLossReportSuccess = createAction(
  '[LossReport] Load LossReport Success',
  props<{ lossReport: LossReport[] }>()
);

export const loadLossReportFailure = createAction(
  '[LossReport] Load LossReport Failure',
  props<{ error: any }>()
);
