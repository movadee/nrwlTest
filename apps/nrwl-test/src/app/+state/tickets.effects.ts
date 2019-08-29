import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { TicketsPartialState } from './tickets.reducer';
import {
  LoadTickets,
  TicketsLoaded,
  TicketsLoadError,
  TicketsActionTypes
} from './tickets.actions';
import { BackendService } from '../backend.service';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TicketsEffects {
  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TicketsPartialState>,
    private backend: BackendService
  ) {}

  @Effect() loadTickets$ = this.dataPersistence.fetch(
    TicketsActionTypes.LoadTickets,
    {
      run: (action: LoadTickets, state: TicketsPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        // return new TicketsLoaded([]);
        return this.backend.tickets().pipe(
          map(data => new TicketsLoaded(data))
          // catchError(error =>
          //   of(new DataActions.LoadDataFailure({ error: error }))
          // )
        );
      },

      onError: (action: LoadTickets, error) => {
        console.error('Error', error);
        return new TicketsLoadError(error);
      }
    }
  );
}
