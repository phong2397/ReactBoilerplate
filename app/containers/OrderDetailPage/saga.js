// import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_ORDER_DETAIL } from './constants';
import { loadingOrderDetailSuccess, loadingOrderDetailError } from './actions';

export function* loadOrderSaga() {
  console.log('SAGA LOAD ORDER DETAIL');
  try {
    const requestURL = '/orders/2';
    const response = yield call(request, requestURL);
    console.log('Saga response: ', response);
    yield put(loadingOrderDetailSuccess(response));
  } catch (err) {
    yield put(loadingOrderDetailError(err));
  }
}

// Individual exports for testing
export default function* orderDetailPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_ORDER_DETAIL, loadOrderSaga);
}
