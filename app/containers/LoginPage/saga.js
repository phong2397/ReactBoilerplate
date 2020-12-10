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
import { saveAccessToken } from '../../utils/storage';
// import { loadDataProfileSuccess } from '../ProfileInfoPage/actions';

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
  // const companyId = yield select(makeSelectCompanyId());
  const data = yield select(makeSelectData());
  const otp = yield select(makeSelectOtp());
  const { systemtrace } = data;
  const { tel } = data;
  // CheckExist

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
      FunctionName: 'VALIDATESMSOTP',
      Data: {
        otp,
        systemtrace,
        tel,
      },
    }),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    if (response.ResponseCode === '000') {
      // const responseProfile = yield call(
      //   request,
      //   `/api/v1/customers/profile/${tel}`,
      // );
      // SAVE TOKEN
      saveAccessToken(response.Data);
      // yield put(loadDataProfileSuccess(responseProfile));
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
