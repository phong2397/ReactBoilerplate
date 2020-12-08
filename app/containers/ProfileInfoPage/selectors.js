import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profileInfoPage state domain
 */

const selectProfileInfoPageDomain = state =>
  state.profileInfoPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProfileInfoPage
 */

const makeSelectProfileInfoPage = () =>
  createSelector(
    selectProfileInfoPageDomain,
    substate => substate,
  );

export default makeSelectProfileInfoPage;
export { selectProfileInfoPageDomain };
