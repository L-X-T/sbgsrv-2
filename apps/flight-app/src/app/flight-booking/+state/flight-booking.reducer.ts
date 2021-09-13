import { createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-lib';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  flightBooking: State;
}

export interface State {
  flights: Flight[];
}

export const initialState: State = {
  flights: []
};

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),

  on(FlightBookingActions.updateFlight, (state, action) => {
    const flight = action.flight;
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights };
  })
);
