import { Action } from '@ngrx/store';
import { Entity } from './tickets.reducer';

export enum TicketsActionTypes {
  LoadTickets = '[Tickets] Load Tickets',
  TicketsLoaded = '[Tickets] Tickets Loaded',
  TicketsLoadError = '[Tickets] Tickets Load Error',
  AddTicket = '[Tickets] Add Ticket'
}

export class LoadTickets implements Action {
  readonly type = TicketsActionTypes.LoadTickets;
}

export class TicketsLoadError implements Action {
  readonly type = TicketsActionTypes.TicketsLoadError;
  constructor(public payload: any) {}
}

export class TicketsLoaded implements Action {
  readonly type = TicketsActionTypes.TicketsLoaded;
  constructor(public payload: Entity[]) {}
}

export class AddTicket implements Action {
  readonly type = TicketsActionTypes.AddTicket;
  constructor(public payload: string) {}
}

export type TicketsAction =
  | LoadTickets
  | TicketsLoaded
  | TicketsLoadError
  | AddTicket;

export const fromTicketsActions = {
  LoadTickets,
  TicketsLoaded,
  TicketsLoadError,
  AddTicket
};
