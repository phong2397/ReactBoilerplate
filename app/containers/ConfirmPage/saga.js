import { call, put, select, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

import { push } from 'connected-react-router';
import { v4 as uuidv4 } from 'uuid';
import request from 'utils/request';
import {
  getAccessToken,
  getCompanyId,
  getProductConfig,
  getOrderValue,
} from 'utils/storage';

import history from 'utils/history';
import {
  getBasicInfoFail,
  getBasicInfoSuccess,
  hideLoadingg,
  loadRequestOtp,
  requestOrderSuccess,
  requestOtpError,
  showLoading,
  verifyError,
} from './actions';

import { REQUEST_BASIC_INFO, REQUEST_OTP, VERIFY_OTP } from './constants';
import { makeSelectBasicInfo, makeSelectData } from './selectors';

export function* requestOtp({ phone }) {
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
    const response = yield call(request, requestURL, parameters);
    if (response.ResponseCode === '000') {
      yield put(loadRequestOtp(response));
    } else yield put(requestOtpError(response));
  } catch (err) {
    yield put(requestOtpError(err));
  }
}
export function* verifyOtp({ otp }) {
  const receivedOtp = otp;
  const data = yield select(makeSelectData());
  if (data) {
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
          otp: receivedOtp,
          systemtrace,
          tel,
        },
      }),
    };
    try {
      const response = yield call(request, requestURL, parameters);
      if (response.ResponseCode === '000') {
        // yield put(verifySuccess(response));
        const { phone } = yield select(makeSelectBasicInfo());
        const selectedValue = yield call(getOrderValue);
        const companyCode = yield call(getCompanyId);
        const { productRate } = yield call(getProductConfig);
        const feeBorrow = Number.parseFloat(
          (selectedValue * productRate) / 100,
        ).toFixed(0);
        const timeBorrow = 1;
        const requestOrderURL = `/customergateway/api/v1/`;

        const parametersOrder = {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            // prettier-ignore
            'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
          }),
          body: JSON.stringify({
            RequestDateTime: `${moment().format('YYYYMMDDhhmms')}`,
            RequestID: `${uuidv4()}`,
            FunctionName: 'SENDORDERREQUEST',
            Data: {
              borrow: selectedValue,
              companyCode,
              customerPhone: phone,
              feeBorrow,
              interestRate: productRate,
              timeBorrow,
            },
          }),
        };
        const responseOrder = yield call(
          request,
          requestOrderURL,
          parametersOrder,
        );
        if (responseOrder.ResponseCode === '000') {
          yield put(requestOrderSuccess(responseOrder));
          yield put(
            push({
              pathname: '/yeucau/hoan-thanh',
            }),
          );
        } else {
          throw new Error('Không gửi được đơn');
        }
      } else throw new Error('Mã OTP không chính xác. Bạn vui lòng nhập lại');
    } catch (err) {
      yield put(verifyError(err));
    }
  } else {
    throw new Error('Không gửi được đơn');
  }
}
export function* getBasicInfoSaga() {
  // const phone = getPhone();
  yield put(showLoading());
  const accessToken = yield call(getAccessToken);
  const requestURL = `/customergateway/api/v2/customer/find?phone=${accessToken}`;
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
    const rawData = response;

    const basicInfo = {
      accName: response.customerBank,
      accNo: response.customerBankAcc,
      bankName: response.customerBankName,
      birthday: response.customerBirthday,
      address: response.customerAddress,
      addressTemp: response.customerAddressTemp,
      fullname: response.customerName,
      gender: response.customerGender,
      identity: response.customerId,
      identityDate: response.customerIdDate,
      identityLocation: response.customerIdLocation,
      job: response.customerPosition,
      phone: response.customerPhone,
      salaryPermonth: response.customerSalary,
      email: response.customerEmail,
    };
    yield put(getBasicInfoSuccess({ basicInfo, rawData }));
  } catch (err) {
    if (err.message === '401') {
      yield call(history.push, '/logout');
    }
    yield put(getBasicInfoFail(err));
  }
  yield put(hideLoadingg());
}
export default function* confirmPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_BASIC_INFO, getBasicInfoSaga);
  yield takeLatest(REQUEST_OTP, requestOtp);
  yield takeLatest(VERIFY_OTP, verifyOtp);
}
