import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import moment from 'moment';
import { deleteAccessToken, removeProifle } from '../../utils/storage';
import { REQUEST_LOGOUT } from '../App/constants';
import { makeSelectCurrentProfile } from '../App/selectors';
import { loadedProductConfig, loadProductError } from './actions';
import { LOAD_PRODUCT_CONFIG } from './constants';
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

// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_LOGOUT, logout);
  yield takeLatest(LOAD_PRODUCT_CONFIG, loadProductSaga);
}
