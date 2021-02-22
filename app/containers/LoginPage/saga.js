import { call, put, select, takeLatest } from 'redux-saga/effects';
import { saveAccessToken, setPhone, setCompanyId } from 'utils/storage';
import { push } from 'connected-react-router';
import request from 'utils/request';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { makeSelectData, makeSelectOtp } from './selectors';
import {
  CHECK_USER_EXIST,
  LOAD_COMPANY_LIST,
  REQUEST_LOGIN,
  REQUEST_OTP,
} from './constants';
import {
  loadRequestOtp,
  requestLoginError,
  requestOtpError,
  loadLoginSuccess,
  requestOtpAction,
  loadingRequest,
  loadedCompanyList,
} from './actions';

// import { loadedProfile } from '../App/actions';
export function* requestOtp({ phone }) {
  // const companyId = yield select(makeSelectCompanyId());
  // const phone = yield select(makeSelectPhone());
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
      RequestID: `${uuidv4()}`,
      FunctionName: 'SENDSMSOTP',
      Data: {
        tel: `${phone}`,
        content:
          'VNAY.COM.VN Ma xac minh cua ban la ... , ma xac minh nay chi hieu luc trong 10 phut',
      },
    }),
  };
  try {
    yield put(loadingRequest(true));
    const response = yield call(request, requestURL, parameters);
    if (response.ResponseCode === '000') {
      yield put(loadRequestOtp(response));
    } else yield put(requestOtpError(response));
  } catch (err) {
    yield put(requestOtpError(err));
  }
  yield put(loadingRequest(false));
}
export function* loadCompanyList() {
  const requestURL = `/customergateway/api/v1/company`;
  const parameters = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    yield put(loadedCompanyList(response));
  } catch (err) {
    yield put(requestLoginError(err));
  }
}
export function* doLogin() {
  const data = yield select(makeSelectData());
  const otp = yield select(makeSelectOtp());
  const { systemtrace, tel } = data;
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
      RequestID: `${uuidv4()}`,
      FunctionName: 'VALIDATESMSOTP',
      Data: {
        otp,
        systemtrace,
        tel,
      },
    }),
  };
  try {
    yield put(loadingRequest(true));
    const response = yield call(request, requestURL, parameters);
    if (response.ResponseCode === '000') {
      yield call(saveAccessToken, response.Data);
      yield call(setPhone, tel);
      yield put(loadLoginSuccess(response));
      yield put(push('/'));
    } else yield put(requestLoginError(response));
  } catch (err) {
    yield put(requestLoginError(err));
  }
  yield put(loadingRequest(false));
}
export function* checkExistProfile({ phone, companyId }) {
  yield put(loadingRequest(true));
  // const companyId = yield select(makeSelectCompanyId());
  // const phone = yield select(makeSelectPhone());
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
      RequestID: `${uuidv4()}`,
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
      yield put(requestOtpAction(phone));
      yield call(setCompanyId, companyId);
    } else {
      yield put(requestOtpError(response));
    }
  } catch (err) {
    yield put(requestOtpError(err));
  }
  yield put(loadingRequest(false));
}
export default function* loginPageSaga() {
  yield takeLatest(CHECK_USER_EXIST, checkExistProfile);
  yield takeLatest(LOAD_COMPANY_LIST, loadCompanyList);
  yield takeLatest(REQUEST_OTP, requestOtp);
  yield takeLatest(REQUEST_LOGIN, doLogin);
}
