import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LossReportActions from './loss-report.actions';
import { LossReportDataService } from '../../infrastructure/loss-report.data.service';

@Injectable()
export class LossReportEffects {
  loadLossReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LossReportActions.loadLossReport),
      switchMap((action) =>
        this.lossReportDataService.load().pipe(
          map((lossReport) =>
            LossReportActions.loadLossReportSuccess({ lossReport })
          ),
          catchError((error) =>
            of(LossReportActions.loadLossReportFailure({ error }))
          )
        )
      )
    )
  );

 constructor(
   private actions$: Actions,
   private lossReportDataService: LossReportDataService
  ) { }
}
