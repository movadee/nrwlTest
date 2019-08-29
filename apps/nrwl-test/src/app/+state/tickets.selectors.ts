import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TICKETS_FEATURE_KEY, TicketsState } from './tickets.reducer';

// Lookup the 'Tickets' feature state managed by NgRx
const getTicketsState = createFeatureSelector<TicketsState>(
  TICKETS_FEATURE_KEY
);

const getLoaded = createSelector(
  getTicketsState,
  (state: TicketsState) => state.loaded
);
const getError = createSelector(
  getTicketsState,
  (state: TicketsState) => state.error
);

const getAllTickets = createSelector(
  getTicketsState,
  getLoaded,
  (state: TicketsState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getTicketsState,
  (state: TicketsState) => state.selectedId
);
const getSelectedTickets = createSelector(
  getAllTickets,
  getSelectedId,
  (tickets, id) => {
    const result = tickets.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const ticketsQuery = {
  getLoaded,
  getError,
  getAllTickets,
  getSelectedTickets
};
