import { push } from 'connected-react-router';
import { put, takeLatest } from 'redux-saga/effects';
import { deleteAccessToken } from '../../utils/storage';
import { REQUEST_LOGOUT } from '../App/constants';

export function* logout() {
  deleteAccessToken();
  yield put(push('/login'));
}
// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_LOGOUT, logout);
}
