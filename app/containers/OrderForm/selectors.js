import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderForm state domain
 */

const selectOrderFormDomain = state => state.orderForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderForm
 */

const makeSelectOrderForm = () =>
  createSelector(
    selectOrderFormDomain,
    substate => substate,
  );
const makeSelectValue = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.value,
  );

const makeSelectMax = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.max,
  );

const makeSelectMin = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.min,
  );

const makeSelectDefaultValue = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.defaultValue,
  );
const makeSelectShowMark = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.showMark,
  );
const makeSelectRequestAmount = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.value,
  );
const makeSelectRate = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.rate,
  );
const makeSelectDisbursedAmount = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.disbursedAmount,
  );
const makeSelectMaxAdvance = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.maxAdvance,
  );
const makeSelectCanSlide = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.canSlide,
  );
const makeSelectNoticeError = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.noticeError,
  );
const makeSelectAdvanceCount = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.advanceCount,
  );
const makeSelectRateAdvance = () =>
  createSelector(
    selectOrderFormDomain,
    orderFormState => orderFormState.rateAdvance,
  );
export default makeSelectOrderForm;
export {
  makeSelectRateAdvance,
  selectOrderFormDomain,
  makeSelectRate,
  makeSelectShowMark,
  makeSelectValue,
  makeSelectMax,
  makeSelectMin,
  makeSelectDefaultValue,
  makeSelectRequestAmount,
  makeSelectDisbursedAmount,
  makeSelectMaxAdvance,
  makeSelectCanSlide,
  makeSelectNoticeError,
  makeSelectAdvanceCount,
};
