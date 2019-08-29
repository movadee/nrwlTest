import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { TicketsEffects } from './tickets.effects';
import { TicketsFacade } from './tickets.facade';

import { ticketsQuery } from './tickets.selectors';
import { LoadTickets, TicketsLoaded } from './tickets.actions';
import { TicketsState, Entity, initialState, reducer } from './tickets.reducer';

interface TestSchema {
  tickets: TicketsState;
}

describe('TicketsFacade', () => {
  let facade: TicketsFacade;
  let store: Store<TestSchema>;
  let createTickets;

  beforeEach(() => {
    createTickets = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('tickets', reducer, { initialState }),
          EffectsModule.forFeature([TicketsEffects])
        ],
        providers: [TicketsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(TicketsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allTickets$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allTickets$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `TicketsLoaded` to manually submit list for state management
     */
    it('allTickets$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allTickets$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new TicketsLoaded([createTickets('AAA'), createTickets('BBB')])
        );

        list = await readFirst(facade.allTickets$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
