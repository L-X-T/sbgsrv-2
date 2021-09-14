import { createAction, props } from '@ngrx/store';
import { Luggage } from '../../entities/luggage';

export const loadLuggage = createAction(
  '[Luggage] Load Luggage'
);

export const loadLuggageSuccess = createAction(
  '[Luggage] Load Luggage Success',
  props<{ luggage: Luggage[] }>()
);

export const loadLuggageFailure = createAction(
  '[Luggage] Load Luggage Failure',
  props<{ error: any }>()
);
