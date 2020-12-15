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
const makeSelectCustomer = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.customer,
  );
const makeSelectLoading = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.loading,
  );
const makeSelectOpen = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.open,
  );
const makeSelectNotifyTitle = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.notifyTitle,
  );
const makeSelectTypeId = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.typeId,
  );
const makeSelectMessageContent = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.messageContent,
  );
export default makeSelectProfileInfoPage;
export {
  selectProfileInfoPageDomain,
  makeSelectLoading,
  makeSelectCustomer,
  makeSelectOpen,
  makeSelectNotifyTitle,
  makeSelectTypeId,
  makeSelectMessageContent,
};
