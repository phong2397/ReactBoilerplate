import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profilePage state domain
 */

const selectProfilePageDomain = state => state.profilePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProfilePage
 */

const makeSelectProfilePage = () =>
  createSelector(
    selectProfilePageDomain,
    substate => substate,
  );

const makeSelectProfileInfoPage = () =>
  createSelector(
    selectProfilePageDomain,
    substate => substate,
  );

const makeSelectProfileHistoryPage = () =>
  createSelector(
    selectProfilePageDomain,
    substate => substate,
  );

const makeSelectProfileDocumentPage = () =>
  createSelector(
    selectProfilePageDomain,
    substate => substate,
  );

export default makeSelectProfilePage;
export {
  selectProfilePageDomain,
  makeSelectProfileInfoPage,
  makeSelectProfileHistoryPage,
  makeSelectProfileDocumentPage,
};
