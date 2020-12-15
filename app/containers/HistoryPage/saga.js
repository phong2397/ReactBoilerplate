// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_ORDERS } from './constants';
import { loadOrdersError, loadOrdersSuccess } from './actions';
import { makeSelectCurrentProfile } from '../App/selectors';

export function* loadOrderSaga() {
  console.log('SAGA LOAD ORDER');
  const { customerPhone } = yield select(makeSelectCurrentProfile());
  try {
    const requestURL = `/orders?phone=${customerPhone}`;
    const response = yield call(request, requestURL);
    console.log(response);
    yield put(loadOrdersSuccess(response));
  } catch (err) {
    yield put(loadOrdersError(err));
  }
}

// Individual exports for testing
export default function* historyPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_ORDERS, loadOrderSaga);
}
