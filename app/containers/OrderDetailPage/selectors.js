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
    substate => substate.initStage,
  );

const makeSelectOrderAppraisalStage = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.appraisalStage,
  );

const makeSelectOrderDisbursementStage = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.disbursementStage,
  );

const makeSelectOrderRepaymentStage = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.repaymentStage,
  );

const makeSelectLoading = () =>
  createSelector(
    selectOrderDetailPageDomain,
    substate => substate.loading,
  );

export default makeSelectOrderDetailPage;
export {
  selectOrderDetailPageDomain,
  makeSelectOrderInitStage,
  makeSelectOrderAppraisalStage,
  makeSelectOrderDisbursementStage,
  makeSelectOrderRepaymentStage,
  makeSelectLoading,
};
