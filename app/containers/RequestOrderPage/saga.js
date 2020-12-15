import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectCurrentProfile } from '../App/selectors';
import {
  makeSelectAmount,
  makeSelectProductConfig,
} from '../HomePage/selectors';
import {
  closeModalAction,
  openModalAction,
  sendOrderError,
  sendOrderSuccess,
} from './actions';
import {
  CONFIRM_ORDER,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
} from './constants';
import { makeSelectCheckTerm } from './selectors';

export function* sendOrderSuccessSaga() {
  yield put(openModalAction());
}
export function* closeModalAndRedirect() {
  yield put(closeModalAction());
  yield put(push('/'));
}
export function* sendOrder() {
  try {
    const checkTerm = yield select(makeSelectCheckTerm());
    if (checkTerm) {
      const requestURL = '/api/orders/';
      const borrow = yield select(makeSelectAmount());
      const customer = yield select(makeSelectCurrentProfile());
      const productConfig = yield select(makeSelectProductConfig());
      const parameters = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          // prettier-ignore
          'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
        }),
        body: JSON.stringify({
          companyCode: customer.companyCode,
          customerPhone: customer.customerPhone,
          borrow,
          timeBorrow: '1',
          interestRate: productConfig.productRate,
          feeBorrow: productConfig.productFee,
        }),
      };
      const response = yield call(request, requestURL, parameters);
      yield put(sendOrderSuccess(response));
    } else {
      const err = {
        message: 'Bạn cần phải chấp thuận với điều khoản',
      };
      yield put(sendOrderError(err));
    }
  } catch (err) {
    yield put(sendOrderError(err));
  }
}
export default function* requestOrderPageSaga() {
  yield takeLatest(SEND_ORDER_REQUEST, sendOrder);
  yield takeLatest(SEND_ORDER_SUCCESS, sendOrderSuccessSaga);
  yield takeLatest(CONFIRM_ORDER, closeModalAndRedirect);
}
