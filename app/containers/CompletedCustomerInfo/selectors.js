import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the completedCustomerInfo state domain
 */

const selectCompletedCustomerInfoDomain = state =>
  state.completedCustomerInfo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CompletedCustomerInfo
 */

const makeSelectCompletedCustomerInfo = () =>
  createSelector(
    selectCompletedCustomerInfoDomain,
    substate => substate,
  );

export default makeSelectCompletedCustomerInfo;
export { selectCompletedCustomerInfoDomain };
