import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { TicketsPartialState } from './tickets.reducer';
import { ticketsQuery } from './tickets.selectors';
import { LoadTickets, AddTicket } from './tickets.actions';

@Injectable()
export class TicketsFacade {
  loaded$ = this.store.pipe(select(ticketsQuery.getLoaded));
  allTickets$ = this.store.pipe(select(ticketsQuery.getAllTickets));
  selectedTickets$ = this.store.pipe(select(ticketsQuery.getSelectedTickets));

  constructor(private store: Store<TicketsPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadTickets());
  }

  addTicket(ticket: string) {
    this.store.dispatch(new AddTicket(ticket));
  }
}
