import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );
const makeSelectLoading = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.loading,
  );
const makeSelectCreditAmount = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.creditAmount,
  );
const makeSelectAmount = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.selectedAmount,
  );
const makeSelectStep = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.step,
  );

const makeSelectDefaultAmount = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.defaultAmount,
  );

const makeSelectFeeAmount = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.feeAmount,
  );
const makeSelectRate = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.rate,
  );
const makeSelectAccNo = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.accNo,
  );
const makeSelectCustomePhone = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.phone,
  );
const makeSelectBankName = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.bankName,
  );

const makeSelectAccName = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.accName,
  );
const makeSelectCompanyCode = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.companyCode,
  );
export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectLoading,
  makeSelectCreditAmount,
  makeSelectAmount,
  makeSelectStep,
  makeSelectDefaultAmount,
  makeSelectFeeAmount,
  makeSelectRate,
  makeSelectAccNo,
  makeSelectBankName,
  makeSelectAccName,
  makeSelectCustomePhone,
  makeSelectCompanyCode,
};
