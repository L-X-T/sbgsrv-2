import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from '../../environments/environment';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
