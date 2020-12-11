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

const makeSelectOrderInitStage = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.initialState,
  );

const makeSelectOrderAppraisalStage = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.initialState,
  );

const makeSelectOrderDisbursementStage = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.initialState,
  );

const makeSelectOrderRepaymentStage = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.initialState,
  );

export default makeSelectOrderDetailPage;
export {
  selectOrderDetailPageDomain,
  makeSelectOrderInitStage,
  makeSelectOrderAppraisalStage,
  makeSelectOrderDisbursementStage,
  makeSelectOrderRepaymentStage,
};
