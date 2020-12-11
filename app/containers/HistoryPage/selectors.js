import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the historyPage state domain
 */

const selectHistoryPageDomain = state => state.historyPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryPage
 */

const makeSelectHistoryPage = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate,
  );

const makeSelectListOrders = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.listOrders,
  );

export default makeSelectHistoryPage;
export { selectHistoryPageDomain, makeSelectListOrders };
