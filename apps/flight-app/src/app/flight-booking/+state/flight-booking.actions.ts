import { createAction, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-lib';

export const loadFlights = createAction('[FlightBooking] LoadFlights', props<{ from: string; to: string; urgent: boolean }>());
export const loadFlightsError = createAction('[FlightBooking] Load Flights Error');
export const loadFlightsSuccessfully = createAction('[FlightBooking] FlightsLoaded', props<{ flights: Flight[] }>());

export const updateFlight = createAction('[FlightBooking] Update Flight', props<{ flight: Flight }>());
