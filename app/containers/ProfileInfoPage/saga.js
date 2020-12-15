import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectCurrentProfile } from '../App/selectors';
import { loadProfile } from '../Main/actions';
import { updateProfileError, updateProfileSuccess } from './actions';
import { CLOSE_DIALOG_GO_HOME, UPDATE_PROFILE } from './constants';
// import { loadProfileError, loadProfileSuccess } from './actions';
// import { LOAD_DATA_PROFILE } from './constants';

export function* requestUpdate(action) {
  // const newProfile = yield select(makeSelectProfileInfo());
  // console.log('New Profile 2', action.newProfile);
  const { newProfile } = action;
  const { customerPhone } = yield select(makeSelectCurrentProfile());
  const requestURL = `/customers/profile/${customerPhone}`;
  console.log('Profile ', newProfile);
  const parameters = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(newProfile),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    if (response.code === 200) {
      yield put(loadProfile(customerPhone));
      yield put(updateProfileSuccess(newProfile));
    } else yield put(updateProfileError(response));
  } catch (err) {
    yield put(updateProfileError(err));
  }
}
export function* goToHome() {
  yield put(push('/'));
}
// Individual exports for testing
export default function* profileInfoPageSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(LOAD_DATA_PROFILE, loadProfile);
  yield takeLatest(UPDATE_PROFILE, requestUpdate);
  yield takeLatest(CLOSE_DIALOG_GO_HOME, goToHome);
}
