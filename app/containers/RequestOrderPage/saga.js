import { push } from 'connected-react-router';
import { put, takeLatest } from 'redux-saga/effects';
import { closeModalAction, openModalAction } from './actions';
import { CONFIRM_ORDER, SEND_ORDER_REQUEST } from './constants';

export function* sendOrderSaga() {
  yield put(openModalAction());
}
export function* closeModalAndRedirect() {
  yield put(closeModalAction());
  yield put(push('/'));
}
export default function* requestOrderPageSaga() {
  yield takeLatest(SEND_ORDER_REQUEST, sendOrderSaga);
  yield takeLatest(CONFIRM_ORDER, closeModalAndRedirect);
}
