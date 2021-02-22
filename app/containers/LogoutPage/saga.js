import history from 'utils/history';
import { call, takeLatest } from 'redux-saga/effects';
import { deleteAccessToken, removeProifle } from 'utils/storage';
import { DO_LOGOUT } from './constants';

export function* doLogoutSaga() {
  yield call(removeProifle);
  yield call(deleteAccessToken);
  yield call(history.push, '/');
}
// Individual exports for testing
export default function* logoutPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(DO_LOGOUT, doLogoutSaga);
}
