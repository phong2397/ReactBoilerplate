import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the requestOrderPage state domain
 */

const selectRequestOrderPageDomain = state =>
  state.requestOrderPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RequestOrderPage
 */

const makeSelectRequestOrderPage = () =>
  createSelector(
    selectRequestOrderPageDomain,
    substate => substate,
  );
const makeSelectCustomerId = () =>
  createSelector(
    selectRequestOrderPageDomain,
    requestOrderState => requestOrderState.customerId,
  );
const makeSelectCustomerName = () =>
  createSelector(
    selectRequestOrderPageDomain,
    requestOrderState => requestOrderState.customerName,
  );

const makeSelectCompanyName = () =>
  createSelector(
    selectRequestOrderPageDomain,
    requestOrderState => requestOrderState.companyName,
  );
const makeSelectOpenModal = () =>
  createSelector(
    selectRequestOrderPageDomain,
    requestOrderState => requestOrderState.openModal,
  );
export default makeSelectRequestOrderPage;
export {
  selectRequestOrderPageDomain,
  makeSelectCustomerId,
  makeSelectCustomerName,
  makeSelectCompanyName,
  makeSelectOpenModal,
};
