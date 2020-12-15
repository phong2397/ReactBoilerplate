import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from 'utils/request';
import moment from 'moment';
import {
  makeSelectData,
  makeSelectPhone,
  makeSelectOtp,
  makeSelectCompanyId,
} from './selectors';
import { CHECK_USER_EXIST, REQUEST_LOGIN, REQUEST_OTP } from './constants';
import {
  loadRequestOtp,
  requestLoginError,
  requestOtpError,
  loadLoginSuccess,
  requestOtpAction,
} from './actions';
import { saveAccessToken } from '../../utils/storage';
import { loadProfile } from '../Main/actions';
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
      yield put(loadProfile(tel));
      saveAccessToken(response.Data);
      yield put(push('/'));
      yield put(loadLoginSuccess(response));
    } else yield put(requestLoginError(response));
  } catch (err) {
    yield put(requestLoginError(err));
  }
}
export function* checkExistProfile() {
  const companyId = yield select(makeSelectCompanyId());
  const phone = yield select(makeSelectPhone());
  // CheckExist
  const requestURL = `/customergateway/api/v1/`;
  const parameters = {
    mode: 'cors', // no-cors, *cors, same-origin
    referrerPolicy: 'origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
    body: JSON.stringify({
      RequestDateTime: `${moment().format('YYYYMMDDhhmms')}`,
      RequestID: '{{$guid}}',
      FunctionName: 'CHECKEXISTUSER',
      Data: {
        customerphone: phone,
        companycode: companyId,
      },
    }),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    if (response.ResponseCode === '000') {
      yield put(requestOtpAction());
    } else {
      yield put(requestOtpError(response));
    }
  } catch (err) {
    yield put(requestOtpError(err));
  }
}
export default function* loginPageSaga() {
  yield takeLatest(CHECK_USER_EXIST, checkExistProfile);
  yield takeLatest(REQUEST_OTP, requestOtp);
  yield takeLatest(REQUEST_LOGIN, doLogin);
}
