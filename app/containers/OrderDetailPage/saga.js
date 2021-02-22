// import { take, call, put, select } from 'redux-saga/effects';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import history from 'utils/history';
import { getAccessToken } from 'utils/storage';
import {
  requestOrderByIdSuccess,
  requestOrderByIdFail,
  requestCustomerSuccess,
  requestCustomerFail,
  loadStateAction,
  requestOrderById,
  requestCustomer,
  loadingAction,
} from './actions';
import {
  REQUEST_CUSTOMER,
  REQUEST_ORDER_BY_ID,
  REQUEST_ORDER_DETAIL,
} from './constants';
import { makeSelectLoadState } from './selectors';

export function* getOrderDetailSaga() {
  const splitedUrl = window.location.href.split('/');
  const requestURL = `/customergateway/api/v1/orderrequest/code?id=${
    splitedUrl[splitedUrl.length - 1] // id
  }`;
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
    yield put(requestOrderByIdSuccess(response));
  } catch (err) {
    yield put(requestOrderByIdFail(err));
  }
  const loadState = yield select(makeSelectLoadState());
  yield put(loadStateAction({ ...loadState, order: true }));
}

export function* getCustomer() {
  // const phone = yield call(getPhone);
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
    const customerInfo = {
      accName: response.customerBank,
      accNo: response.customerBankAcc,
      bankName: response.customerBankName,
      fullname: response.customerName,
    };
    yield put(requestCustomerSuccess(customerInfo));
  } catch (err) {
    if (err.message === '401') {
      yield call(history.push, '/logout');
    }
    yield put(requestCustomerFail(err));
  }
  const loadState = yield select(makeSelectLoadState());
  yield put(loadStateAction({ ...loadState, customer: true }));
}
export function* loadOrderDetail() {
  yield put(loadingAction(true));
  yield all([put(requestOrderById()), put(requestCustomer())]);
}
// Individual exports for testing
export default function* orderDetailPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_ORDER_DETAIL, loadOrderDetail);
  yield takeLatest(REQUEST_ORDER_BY_ID, getOrderDetailSaga);
  yield takeLatest(REQUEST_CUSTOMER, getCustomer);
}
