import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import moment from 'moment';
import { deleteAccessToken, removeProifle } from '../../utils/storage';
import { REQUEST_LOGOUT } from '../App/constants';
import { makeSelectCurrentProfile } from '../App/selectors';
import {
  alertEmptyProfile,
  confirmAlert,
  loadedProductConfig,
  loadProductError,
} from './actions';
import {
  CALL_REQUEST_ORDER,
  GO_TO_PROFILE,
  LOAD_PRODUCT_CONFIG,
} from './constants';
export function* logout() {
  removeProifle();
  deleteAccessToken();
  yield put(push('/login'));
}
export function* loadProductSaga() {
  try {
    const requestURL = '/api/products/default';
    const response = yield call(request, requestURL);
    const { customerSalary } = yield select(makeSelectCurrentProfile());
    const config = {
      productCode: response.message.productCode,
      productName: response.message.productName,
      productStatus: response.message.productStatus,
      productAmountMax:
        customerSalary >= response.productAmountMax
          ? response.productAmountMax
          : customerSalary,
      productAmountMin: response.message.productAmountMin,
      productFee: response.message.productFee,
      productRate: response.message.productRate,
    };
    yield put(loadedProductConfig(config));
  } catch (err) {
    yield put(loadProductError(err));
  }
}
export function* callRequestOrder() {
  const customer = yield select(makeSelectCurrentProfile());
  const check = Object.values(customer).some(
    x => x === null || x === '' || x.length === 0,
  );
  if (check) {
    yield put(alertEmptyProfile());
  } else {
    yield put(push('/requestOrder'));
  }
}
export function* goToProfile() {
  yield put(confirmAlert());
  yield put(push('/profile'));
}
// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_LOGOUT, logout);
  yield takeLatest(LOAD_PRODUCT_CONFIG, loadProductSaga);
  yield takeLatest(CALL_REQUEST_ORDER, callRequestOrder);
  yield takeLatest(GO_TO_PROFILE, goToProfile);
}
