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

const makeSelectOrderList = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.orderList,
  );

const makeSelectRawData = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.rawData,
  );

const makeSelectFirstLoad = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => substate.firstLoad,
  );
export default makeSelectHistoryPage;
export {
  selectHistoryPageDomain,
  makeSelectOrderList,
  makeSelectRawData,
  makeSelectFirstLoad,
};
