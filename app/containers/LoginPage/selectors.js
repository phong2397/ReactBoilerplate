import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */
const selectGlobal = state => state.global || initialState;

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */
const makeSelectProfile = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentProfile,
  );
const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );
const makeSelectPhone = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.phone,
  );
const makeSelectData = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.data,
  );
const makeSelectCompanyId = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.companyId,
  );
const makeSelectError = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.error,
  );
const makeSelectOtp = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.otp,
  );

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeSelectProfile,
  makeSelectPhone,
  makeSelectCompanyId,
  makeSelectData,
  makeSelectError,
  makeSelectOtp,
};
