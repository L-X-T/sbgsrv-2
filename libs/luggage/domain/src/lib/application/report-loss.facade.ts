import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadLossReport } from '../+state/loss-report/loss-report.actions';
import * as fromLossReport from '../+state/loss-report/loss-report.reducer';
import * as LossReportSelectors from '../+state/loss-report/loss-report.selectors';

@Injectable({ providedIn: 'root' })
export class ReportLossFacade {
  loaded$ = this.store.pipe(select(LossReportSelectors.getLossReportLoaded));
  lossReportList$ = this.store.pipe(select(LossReportSelectors.getAllLossReport));
  selectedLossReport$ = this.store.pipe(select(LossReportSelectors.getSelected));

  constructor(private store: Store<fromLossReport.LossReportPartialState>) { }

  load(): void {
    this.store.dispatch(loadLossReport());
  }
}
