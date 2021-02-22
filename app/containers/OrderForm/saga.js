import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import moment from 'moment';
import {
  deleteAccessToken,
  removeProifle,
  setProductConfig,
  getPhone,
} from 'utils/storage';
import { loadedProductConfig, loadProductError } from './actions';
import { LOAD_PRODUCT_CONFIG, REQUEST_ORDER } from './constants';
export function* logout() {
  removeProifle();
  deleteAccessToken();
  yield put(push('/login'));
}
export function* loadProductSaga() {
  try {
    const phone = yield call(getPhone);
    const requestURL = `/customergateway/api/v1/config/${phone}`;
    const response = yield call(request, requestURL);
    if (response.responseCode === '000') {
      const {
        maxAmount,
        minAmount,
        interestRate,
        advanceAmount,
        customerSalary,
        advanceCount,
        rateAdvance,
      } = JSON.parse(response.data);
      const productAmountMax = customerSalary;
      const productAmountMin = minAmount;
      const disbursedAmount = advanceAmount;
      const productRate = interestRate;
      const maxAdvance = maxAmount;
      yield put(
        loadedProductConfig({
          productAmountMax,
          productAmountMin,
          productRate,
          disbursedAmount,
          maxAdvance,
          advanceCount,
          rateAdvance,
        }),
      );
      yield call(setProductConfig, {
        productAmountMax,
        productAmountMin,
        productRate,
        disbursedAmount,
        maxAdvance,
        advanceCount,
        rateAdvance,
      });
    } else {
      yield put(loadProductError(response));
    }
  } catch (err) {
    yield put(loadProductError(err));
  }
}
export function* requestOrderSaga({ order }) {
  console.log(order);
  yield put(push('/yeucau/chi-tiet'));
}
// Individual exports for testing
export default function* orderFormSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_PRODUCT_CONFIG, loadProductSaga);
  yield takeLatest(REQUEST_ORDER, requestOrderSaga);
}
