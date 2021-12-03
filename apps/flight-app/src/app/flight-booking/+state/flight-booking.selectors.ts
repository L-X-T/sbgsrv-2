import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';
import { Flight } from '@flight-workspace/flight-lib';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(fromFlightBooking.flightBookingFeatureKey);

export const selectFlights = createSelector(selectFlightBookingState, (s) => s.flights);
export const negativeList = createSelector(selectFlightBookingState, (s) => s.negativeList);

export const selectFilteredFlights = createSelector(selectFlights, negativeList, (flights, negativeList) =>
  flights.filter((f) => !negativeList.includes(f.id))
);

export const selectFlightsWithProps = (props: {
  blackList: number[];
}): MemoizedSelector<fromFlightBooking.FlightBookingAppState, Flight[], DefaultProjectorFn<Flight[]>> =>
  createSelector(selectFlights, (flights) => flights.filter((f) => !props.blackList.includes(f.id)));

export const selectIsLoadingFlights = createSelector(selectFlightBookingState, (s) => s.isLoadingFlights);
