import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import moment from 'moment';
import { makeSelectData, makeSelectPhone, makeSelectOtp } from './selectors';
import { REQUEST_LOGIN, REQUEST_OTP } from './constants';
import {
  loadRequestOtp,
  requestLoginError,
  requestOtpError,
  loadLoginSuccess,
} from './actions';
import { saveAccessToken, saveProfile } from '../../utils/storage';
import { loadedProfile } from '../App/actions';
// import { loadProfileSuccess } from '../ProfileInfoPage/actions';

/**
 * Github repos request/response handler
 */
export function* requestOtp() {
  // const companyId = yield select(makeSelectCompanyId());
  const phone = yield select(makeSelectPhone());
  const requestURL = `/smsgateway/api/v1/`;
  const parameters = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
    body: JSON.stringify({
      RequestDateTime: `${moment().format('YYYYMMDDhhmms')}`,
      RequestID: '{{$guid}}',
      FunctionName: 'SENDSMSOTP',
      Data: {
        tel: `${phone}`,
        content:
          'VNAY.COM.VN Ma xac minh cua ban la ... , ma xac minh nay chi hieu luc trong 10 phut',
      },
    }),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    if (response.ResponseCode === '000') {
      yield put(push('/login/verify'));
      yield put(loadRequestOtp(response));
    } else yield put(requestOtpError(response));
  } catch (err) {
    yield put(requestOtpError(err));
  }
}
export function* doLogin() {
  const data = yield select(makeSelectData());
  const otp = yield select(makeSelectOtp());
  const { systemtrace } = data;
  const { tel } = data;
  // CheckExist
  const requestURL = `/smsgateway/api/v1/`;
  // const requesProfileURL = `/customers/profile/${tel}`;
  const requesProfileURL = `/customers/profile/0973154950`;
  const parameters = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
    body: JSON.stringify({
      RequestDateTime: `${moment().format('YYYYMMDDhhmms')}`,
      RequestID: '{{$guid}}',
      FunctionName: 'VALIDATESMSOTP',
      Data: {
        otp,
        systemtrace,
        tel,
      },
    }),
  };
  try {
    // const data = {
    //   customerName: 'Nguyen Van F',
    //   customerCode: 'SGF123',
    //   companyName: 'SGFintech',
    //   companyCode: 'SGF123',
    //   customerSalary: 5000000,
    //   accountName: 'Nguyen Van A',
    //   bankAcc: '12091129099283',
    //   bankName: 'SCB',
    //   customerAddress: '12 Hau Giang Quan 6',
    //   customerIdentity: '026062666',
    //   identityLocation: 'CA TPHCM',
    //   identityDate: '2020-12-01T00:00:00.000Z',
    // };
    const response = yield call(request, requestURL, parameters);
    const responseProfile = yield call(request, requesProfileURL);
    const profile = {
      customerName: responseProfile.customerName,
      customerId: responseProfile.customerId,
      companyName: responseProfile.companyName,
      creditAmount: responseProfile.customerSalary,
      idCard: responseProfile.customerIdentity,
      customerAddress: responseProfile.customerAddress,
      idCardIssueDate: responseProfile.identityDate,
      idCardIssuePlace: responseProfile.identityLocation,
      bankName: responseProfile.bankName,
      accountNumber: responseProfile.bankAcc,
      accountName: responseProfile.accountName,
    };
    yield put(loadedProfile(profile));
    if (response.ResponseCode === '000') {
      // SAVE TOKEN
      saveProfile(profile);
      saveAccessToken(response.Data);
      // yield put(loadProfileSuccess(responseProfile));
      yield put(push('/'));
      yield put(loadLoginSuccess(response));
    } else yield put(requestLoginError(response));
  } catch (err) {
    yield put(requestLoginError(err));
  }
}
// /**
//  * Root saga manages watcher lifecycle
//  */
// export default function* githubData() {
//   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(LOAD_REPOS, getRepos);
// }

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_OTP, requestOtp);
  yield takeLatest(REQUEST_LOGIN, doLogin);
}
