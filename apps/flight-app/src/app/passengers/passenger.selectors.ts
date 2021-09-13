import * as fromPassenger from './passenger.reducer';
import { createSelector } from '@ngrx/store';
import { passengersFeatureKey } from './passenger.reducer';

// Parent node pointing to passenger state
export class PassengerAppState {
  [passengersFeatureKey]: fromPassenger.State;
}

// Selector pointing to passenger state in store
const base = (s: PassengerAppState) => s.passengers;

// Selector pointing to all passenger entities
export const selectAllPassengers = createSelector(base, fromPassenger.selectAll);
