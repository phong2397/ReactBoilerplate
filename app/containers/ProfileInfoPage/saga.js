// import { call, put, takeLatest } from 'redux-saga/effects';
// import request from 'utils/request';
// import { loadProfileError, loadProfileSuccess } from './actions';
// import { LOAD_DATA_PROFILE } from './constants';

// export function* requestUpdate(customerPhone) {
//   // const companyId = yield select(makeSelectCompanyId());
//   const accountName = yield select(makeSelectAccountName());
//   const accountNumber = yield select(makeSelectAccountNumber());
//   const bankName = yield select(makeSelectBankName());
//   const companyName = yield select(makeSelectCompanyName());
//   const creditAmount = yield select(makeSelectCreditAmount());
//   const customerAddress = yield select(makeSelectCustomerAddress());
//   const customerId = yield select(makeSelectCustomerId());
//   const customerName = yield select(makeSelectCustomerName());
//   const idCard = yield select(makeSelectIdCard());
//   const idCardIssueDate = yield select(makeSelectIdCardIssueDate());
//   const idCardIssuePlace = yield select(makeSelectIdCardIssuePlace());

//   const requestURL = `/api/v1/customers/updateProfile/${customerPhone}`;
//   const parameters = {
//     method: 'PUT',
//     headers: new Headers({
//       'Content-Type': 'application/json',
//     }),
//     body: JSON.stringify({
//       name: customerName,
//       code: customerId,
//       workAt: companyName,
//       // eslint-disable-next-line object-shorthand
//       bankName: bankName,
//       accName: accountName,
//       accNo: accountNumber,
//       salary: creditAmount,
//       address: customerAddress,
//       id: idCard,
//       idDate: idCardIssueDate,
//       idLocation: idCardIssuePlace,
//     }),
//   };

//   try {
//     const response = yield call(request, requestURL, parameters);
//     if (response.ResponseCode === '000') {
//       yield put(push('/profileinfo'));
//       yield put(requestUpdateDataProfile(response));
//     } else yield put(requestUpdateDataProfileError(response));
//   } catch (err) {
//     yield put(requestUpdateDataProfileError(err));
//   }
// }
// Individual exports for testing
export default function* profileInfoPageSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(LOAD_DATA_PROFILE, loadProfile);
}
