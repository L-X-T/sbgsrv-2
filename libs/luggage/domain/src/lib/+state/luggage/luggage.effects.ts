import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LuggageActions from './luggage.actions';
import { LuggageDataService } from '../../infrastructure/luggage.data.service';

@Injectable()
export class LuggageEffects {
  loadLuggage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LuggageActions.loadLuggage),
      switchMap((action) =>
        this.luggageDataService.load().pipe(
          map((luggage) =>
            LuggageActions.loadLuggageSuccess({ luggage })
          ),
          catchError((error) =>
            of(LuggageActions.loadLuggageFailure({ error }))
          )
        )
      )
    )
  );

 constructor(
   private actions$: Actions,
   private luggageDataService: LuggageDataService
  ) { }
}
