import { createAction, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-lib';

export const flightsLoaded = createAction('[FlightBooking] FlightsLoaded', props<{ flights: Flight[] }>());

export const updateFlight = createAction('[FlightBooking] Update Flight', props<{ flight: Flight }>());
