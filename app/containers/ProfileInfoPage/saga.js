import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';

import {
  makeSelectAccountName,
  makeSelectAccountNumber,
  makeSelectBankName,
  makeSelectCompanyName,
  makeSelectCreditAmount,
  makeSelectCustomerAddress,
  makeSelectCustomerId,
  makeSelectCustomerName,
  makeSelectIdCard,
  makeSelectIdCardIssueDate,
  makeSelectIdCardIssuePlace,
  makeSelectListImages,
} from './selectors';

import { updateDataProfile, requestUpdateDataProfileError } from './actions';
// Individual exports for testing
export default function* profileInfoPageSaga() {
  // See example in containers/HomePage/saga.js
}

export function* requestUpdate() {
  // const companyId = yield select(makeSelectCompanyId());
  const accountName = yield select(makeSelectAccountName());
  const accountNumber = yield select(makeSelectAccountNumber());
  const bankName = yield select(makeSelectBankName());
  const companyName = yield select(makeSelectCompanyName());
  const creditAmount = yield select(makeSelectCreditAmount());
  const customerAddress = yield select(makeSelectCustomerAddress());
  const customerId = yield select(makeSelectCustomerId());
  const customerName = yield select(makeSelectCustomerName());
  const idCard = yield select(makeSelectIdCard());
  const idCardIssueDate = yield select(makeSelectIdCardIssueDate());
  const idCardIssuePlace = yield select(makeSelectIdCardIssuePlace());
  const listImages = yield select(makeSelectListImages());

  const requestURL = `/api/v1/profile`;
  const parameters = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      accountName,
      accountNumber,
      bankName,
      companyName,
      creditAmount,
      customerAddress,
      customerId,
      customerName,
      idCard,
      idCardIssueDate,
      idCardIssuePlace,
      listImages,
    }),
  };

  try {
    const response = yield call(request, requestURL, parameters);
    if (response.ResponseCode === '000') {
      yield put(push('/profileinfo'));
      yield put(updateDataProfile(response));
    } else yield put(requestUpdateDataProfileError(response));
  } catch (err) {
    yield put(requestUpdateDataProfileError(err));
  }
}
