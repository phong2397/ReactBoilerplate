import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the logoutPage state domain
 */

const selectLogoutPageDomain = state => state.logoutPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LogoutPage
 */

const makeSelectLogoutPage = () =>
  createSelector(
    selectLogoutPageDomain,
    substate => substate,
  );

export default makeSelectLogoutPage;
export { selectLogoutPageDomain };
