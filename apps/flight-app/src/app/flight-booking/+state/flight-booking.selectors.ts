import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';
import { FlightBookingAppState } from './flight-booking.reducer';

/*export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);*/

export const selectFlights = (s: FlightBookingAppState) => s.flightBooking.flights;
export const negativeList = (s: FlightBookingAppState) => s.flightBooking.negativeList;

export const selectFilteredFlights = createSelector(selectFlights, negativeList, (flights, negativeList) =>
  flights.filter((f) => !negativeList.includes(f.id))
);
