import { createAction, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-lib';

export const flightsLoaded = createAction('[FlightBooking] FlightsLoaded', props<{ flights: Flight[] }>());
