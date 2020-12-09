import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  makeSelectAmount,
  makeSelectCompanyCode,
  makeSelectCustomePhone,
  makeSelectRate,
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

export function* sendOrderSuccessSaga() {
  yield put(openModalAction());
}
export function* closeModalAndRedirect() {
  yield put(closeModalAction());
  yield put(push('/'));
}
export function* sendOrder() {
  try {
    const requestURL = '/api/orders/';
    const borrow = yield select(makeSelectAmount());
    const companyCode = yield select(makeSelectCompanyCode());

    const customerPhone = yield select(makeSelectCustomePhone());

    const interestRate = yield select(makeSelectRate());

    const parameters = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        // prettier-ignore
        'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
      }),
      body: JSON.stringify({
        companyCode,
        customerPhone,
        borrow,
        timeBorrow: '1',
        interestRate,
        feeBorrow: 0,
      }),
    };
    console.log('PARAMETERS ', parameters);
    const response = yield call(request, requestURL, parameters);
    yield put(sendOrderSuccess(response));
  } catch (err) {
    console.log('SEND ORDER REQUEST ERROR, ', err);
    yield put(sendOrderError(err));
  }
}
export default function* requestOrderPageSaga() {
  yield takeLatest(SEND_ORDER_REQUEST, sendOrder);
  yield takeLatest(SEND_ORDER_SUCCESS, sendOrderSuccessSaga);
  yield takeLatest(CONFIRM_ORDER, closeModalAndRedirect);
}
