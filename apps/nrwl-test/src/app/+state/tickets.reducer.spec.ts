import { TicketsLoaded } from './tickets.actions';
import { TicketsState, Entity, initialState, reducer } from './tickets.reducer';

describe('Tickets Reducer', () => {
  const getTicketsId = it => it['id'];
  let createTickets;

  beforeEach(() => {
    createTickets = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Tickets actions ', () => {
    it('should return set the list of known Tickets', () => {
      const ticketss = [
        createTickets('PRODUCT-AAA'),
        createTickets('PRODUCT-zzz')
      ];
      const action = new TicketsLoaded(ticketss);
      const result: TicketsState = reducer(initialState, action);
      const selId: string = getTicketsId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
