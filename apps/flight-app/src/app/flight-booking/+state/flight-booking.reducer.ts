import { createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-lib';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  flightBooking: State;
}

export interface State {
  flights: Flight[];
  negativeList: number[];
  isLoadingFlights: boolean;
}

export const initialState: State = {
  flights: [],
  negativeList: [3],
  isLoadingFlights: false
};

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.loadFlights, (state, action) => {
    return { ...state, isLoadingFlights: true };
  }),

  on(FlightBookingActions.loadFlightsError, (state, action) => {
    return { ...state, isLoadingFlights: false };
  }),

  on(FlightBookingActions.loadFlightsSuccessfully, (state, action) => {
    const flights = action.flights;
    const isLoadingFlights = false;
    return { ...state, flights, isLoadingFlights };
  }),

  on(FlightBookingActions.updateFlight, (state, action) => {
    const flight = action.flight;
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights };
  })
);
