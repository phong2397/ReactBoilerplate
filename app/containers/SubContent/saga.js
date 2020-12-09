import { goBack } from 'connected-react-router';
import { put, takeLatest } from 'redux-saga/effects';
import { GO_BACK } from './constants';
export function* goBackSaga() {
  yield put(goBack());
}
// Individual exports for testing
export default function* subContentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GO_BACK, goBackSaga);
}
