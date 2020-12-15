import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  deleteAccessToken,
  removeProifle,
  saveProfile,
} from '../../utils/storage';
import { loadedProfile } from '../App/actions';
import { loadProfileSuccess } from './actions';
import { LOAD_PROFILE } from './constants';
import { makeSelectCurrentPhone } from './selectors';
export function* loadProfile() {
  console.log('LOAD PROFILE 3');
  const phone = yield select(makeSelectCurrentPhone()); // Temp phone number for identity user
  const requesProfileURL = `/customers/profile/${phone}`;
  try {
    const responseProfile = yield call(request, requesProfileURL);
    const profile = responseProfile;
    saveProfile(profile);
    yield put(loadProfileSuccess(profile));
    yield put(loadedProfile(profile));
  } catch (err) {
    deleteAccessToken();
    removeProifle();
    yield put(push('/login'));
  }
}
// Individual exports for testing
export default function* mainSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_PROFILE, loadProfile);
}
