import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { TicketsEffects } from './tickets.effects';
import { LoadTickets, TicketsLoaded } from './tickets.actions';

describe('TicketsEffects', () => {
  let actions: Observable<any>;
  let effects: TicketsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        TicketsEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(TicketsEffects);
  });

  describe('loadTickets$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadTickets() });
      expect(effects.loadTickets$).toBeObservable(
        hot('-a-|', { a: new TicketsLoaded([]) })
      );
    });
  });
});
