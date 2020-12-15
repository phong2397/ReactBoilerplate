import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { saveProfile } from '../../utils/storage';
import { updateProfileError, updateProfileSuccess } from './actions';
import { UPDATE_PROFILE } from './constants';
// import { loadProfileError, loadProfileSuccess } from './actions';
// import { LOAD_DATA_PROFILE } from './constants';

export function* requestUpdate(action) {
  // const newProfile = yield select(makeSelectProfileInfo());
  // console.log('New Profile 2', action.newProfile);
  const { newProfile } = action;
  console.log('New Profile: ', newProfile);
  const phone = '0973154950';
  const requestURL = `/customers/profile/${phone}`;
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
      saveProfile(newProfile);
      yield put(updateProfileSuccess(newProfile));
    } else yield put(updateProfileError(response));
  } catch (err) {
    yield put(updateProfileError(err));
  }
}

// Individual exports for testing
export default function* profileInfoPageSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(LOAD_DATA_PROFILE, loadProfile);
  yield takeLatest(UPDATE_PROFILE, requestUpdate);
}
