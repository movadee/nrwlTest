import { TicketsAction, TicketsActionTypes } from './tickets.actions';

export const TICKETS_FEATURE_KEY = 'tickets';

/**
 * Interface for the 'Tickets' data used in
 *  - TicketsState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface TicketsState {
  list: Entity[]; // list of Tickets; analogous to a sql normalized table
  selectedId?: string | number; // which Tickets record has been selected
  loaded: boolean; // has the Tickets list been loaded
  error?: any; // last none error (if any)
}

export interface TicketsPartialState {
  readonly [TICKETS_FEATURE_KEY]: TicketsState;
}

export const initialState: TicketsState = {
  list: [],
  loaded: false
};

export function reducer(
  state: TicketsState = initialState,
  action: TicketsAction
): TicketsState {
  switch (action.type) {
    case TicketsActionTypes.TicketsLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }

    case TicketsActionTypes.AddTicket: {
      const { list } = state;
      list.push(action.payload);
      state = {
        ...state,
        list,
        loaded: true
      };
      break;
    }
  }
  return state;
}
