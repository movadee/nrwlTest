import { Entity, TicketsState } from './tickets.reducer';
import { ticketsQuery } from './tickets.selectors';

describe('Tickets Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTicketsId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createTickets = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      tickets: {
        list: [
          createTickets('PRODUCT-AAA'),
          createTickets('PRODUCT-BBB'),
          createTickets('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Tickets Selectors', () => {
    it('getAllTickets() should return the list of Tickets', () => {
      const results = ticketsQuery.getAllTickets(storeState);
      const selId = getTicketsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedTickets() should return the selected Entity', () => {
      const result = ticketsQuery.getSelectedTickets(storeState);
      const selId = getTicketsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = ticketsQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = ticketsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
