import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import {
  loadDataProfileError,
  loadDataProfileSuccess,
  requestUpdateDataProfile,
  requestUpdateDataProfileError,
} from './actions';
import { LOAD_DATA_PROFILE, REQUEST_UPDATE_DATA_PROFILE } from './constants';
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
} from './selectors';

export function* loadProfile() {
  console.log('LOAD DATA 2');
  const phone = '0973154950';
  try {
    const requestURL = `/customers/profile/${phone}`;
    const response = yield call(request, requestURL);
    console.log(response);
    // yield put(push('/profileinfo'));
    yield put(loadDataProfileSuccess(response));
  } catch (err) {
    yield put(loadDataProfileError(err));
  }
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

  console.log('SAGA REQUEST UPDATE');
  const phone = '0973154950';
  const requestURL = `customers/updateProfile/${phone}`;
  const parameters = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      name: customerName,
      code: customerId,
      workAt: companyName,
      // eslint-disable-next-line object-shorthand
      bankName: bankName,
      accName: accountName,
      accNo: accountNumber,
      salary: creditAmount,
      address: customerAddress,
      id: idCard,
      idDate: idCardIssueDate,
      idLocation: idCardIssuePlace,
    }),
  };

  console.log(`PARAMS: `, parameters);

  try {
    const response = yield call(request, requestURL, parameters);
    console.log(`UPDATE RESPONSE: `, response);
    if (response.ResponseCode === '000') {
      yield put(push('/profileinfo'));
      yield put(requestUpdateDataProfile(response));
    } else yield put(requestUpdateDataProfileError(response));
  } catch (err) {
    yield put(requestUpdateDataProfileError(err));
  }
}
// Individual exports for testing
export default function* profileInfoPageSaga() {
  // See example in containers/HomePage/saga.js
  console.log('IS THIS LOAD ?');
  yield takeLatest(LOAD_DATA_PROFILE, loadProfile);
  yield takeLatest(REQUEST_UPDATE_DATA_PROFILE, requestUpdate);
}
