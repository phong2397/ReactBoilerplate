import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the confirmPage state domain
 */

const selectConfirmPageDomain = state => state.confirmPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfirmPage
 */

const makeSelectConfirmPage = () =>
  createSelector(
    selectConfirmPageDomain,
    substate => substate,
  );
const makeSelectBasicInfo = () =>
  createSelector(
    selectConfirmPageDomain,
    confirmPageState => confirmPageState.basicInfo,
  );
const makeSelectData = () =>
  createSelector(
    selectConfirmPageDomain,
    confirmPageState => confirmPageState.data,
  );
const makeSelectOtp = () =>
  createSelector(
    selectConfirmPageDomain,
    confirmPageState => confirmPageState.otp,
  );
const makeSelectErrors = () =>
  createSelector(
    selectConfirmPageDomain,
    confirmPageState => confirmPageState.errors,
  );
const makeSelectOpenDialog = () =>
  createSelector(
    selectConfirmPageDomain,
    confirmPageState => confirmPageState.openDialog,
  );
const makeSelectProductConfig = () =>
  createSelector(
    selectConfirmPageDomain,
    confirmPageState => confirmPageState.productConfig,
  );
const makeSelectLoading = () =>
  createSelector(
    selectConfirmPageDomain,
    confirmPageState => confirmPageState.loading,
  );
export default makeSelectConfirmPage;
export {
  selectConfirmPageDomain,
  makeSelectLoading,
  makeSelectOpenDialog,
  makeSelectBasicInfo,
  makeSelectData,
  makeSelectOtp,
  makeSelectErrors,
  makeSelectProductConfig,
};
