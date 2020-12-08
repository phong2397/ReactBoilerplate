import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderDetailPage state domain
 */

const selectOrderDetailPageDomain = state =>
  state.orderDetailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderDetailPage
 */

const makeSelectOrderDetailPage = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate,
  );

export default makeSelectOrderDetailPage;
export { selectOrderDetailPageDomain };
