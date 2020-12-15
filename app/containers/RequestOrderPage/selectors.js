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
const makeSelectCheckTerm = () =>
  createSelector(
    selectRequestOrderPageDomain,
    requestOrderState => requestOrderState.checkTerm,
  );
const makeSelectOpenTermModal = () =>
  createSelector(
    selectRequestOrderPageDomain,
    requestOrderState => requestOrderState.makeSelectOpenTermModal,
  );
export default makeSelectRequestOrderPage;
export {
  selectRequestOrderPageDomain,
  makeSelectCheckTerm,
  makeSelectCustomerId,
  makeSelectCustomerName,
  makeSelectCompanyName,
  makeSelectOpenModal,
  makeSelectOpenTermModal,
};
