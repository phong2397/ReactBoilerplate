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

const makeSelectOrder = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.order,
  );

const makeSelectCustomer = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.customer,
  );
const makeSelectLoading = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.loading,
  );
const makeSelectLoadState = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.loadState,
  );
export default makeSelectOrderDetailPage;
export {
  selectOrderDetailPageDomain,
  makeSelectOrder,
  makeSelectCustomer,
  makeSelectLoading,
  makeSelectLoadState,
};
