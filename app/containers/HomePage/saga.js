import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import moment from 'moment';
import { deleteAccessToken } from '../../utils/storage';
import { REQUEST_LOGOUT } from '../App/constants';
import { loadedProductConfig, loadProductError } from './actions';
import { LOAD_PRODUCT_CONFIG } from './constants';
export function* logout() {
  deleteAccessToken();
  yield put(push('/login'));
}
export function* loadProductSaga() {
  try {
    const requestURL = '/api/products/default';
    const response = yield call(request, requestURL);
    yield put(loadedProductConfig(response.message));
  } catch (err) {
    yield put(loadProductError(err));
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_LOGOUT, logout);
  yield takeLatest(LOAD_PRODUCT_CONFIG, loadProductSaga);
}
