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
//  */
//   customerName,
//   customerId,
//   companyName,
//   creditAmount,
//   idCard,
//   customerAddress,
//   idCardIssueDate,
//   idCardIssuePlace,
//   bankName,
//   accountNumber,
//   accountName,
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
const makeSelectCustomerName = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.customerName,
  );
const makeSelectLoading = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.loading,
  );
const makeSelectCustomerId = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.customerId,
  );
const makeSelectCompanyName = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.companyName,
  );
const makeSelectCreditAmount = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.creditAmount,
  );
const makeSelectIdCard = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.idCard,
  );
const makeSelectCustomerAddress = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.customerAddress,
  );
const makeSelectIdCardIssueDate = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.idCardIssueDate,
  );
const makeSelectIdCardIssuePlace = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.idCardIssuePlace,
  );
const makeSelectBankName = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.bankName,
  );
const makeSelectAccountNumber = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.accountNumber,
  );
const makeSelectAccountName = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.accountName,
  );
const makeSelectListImages = () =>
  createSelector(
    selectProfileInfoPageDomain,
    profileState => profileState.listImages,
  );

export default makeSelectProfileInfoPage;
export {
  selectProfileInfoPageDomain,
  makeSelectLoading,
  makeSelectCustomer,
  makeSelectCustomerName,
  makeSelectCustomerId,
  makeSelectCompanyName,
  makeSelectCreditAmount,
  makeSelectIdCard,
  makeSelectCustomerAddress,
  makeSelectIdCardIssueDate,
  makeSelectIdCardIssuePlace,
  makeSelectBankName,
  makeSelectAccountNumber,
  makeSelectAccountName,
  makeSelectListImages,
};
