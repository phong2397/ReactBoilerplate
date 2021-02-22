import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the completedOrder state domain
 */

const selectCompletedOrderDomain = state =>
  state.completedOrder || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CompletedOrder
 */

const makeSelectCompletedOrder = () =>
  createSelector(
    selectCompletedOrderDomain,
    substate => substate,
  );

export default makeSelectCompletedOrder;
export { selectCompletedOrderDomain };
