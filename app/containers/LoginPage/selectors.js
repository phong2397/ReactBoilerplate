import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */
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
const makeSelectCompanyId = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.comapanyId,
  );
const makeSelectError = () =>
  createSelector(
    selectLoginPageDomain,
    loginState => loginState.error,
  );

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeSelectPhone,
  makeSelectCompanyId,
  makeSelectError,
};
