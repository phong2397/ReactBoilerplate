import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { saveProfile } from '../../utils/storage';
import { updateProfileError, updateProfileSuccess } from './actions';
import { UPDATE_PROFILE } from './constants';
// import { loadProfileError, loadProfileSuccess } from './actions';
// import { LOAD_DATA_PROFILE } from './constants';

export function* requestUpdate(action) {
  // const newProfile = yield select(makeSelectProfileInfo());
  console.log('New Profile 2', action.newProfile);
  const { newProfile } = action;
  const phone = '0973154950';
  const requestURL = `/customers/profile/${phone}`;
  const parameters = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      name: newProfile.customerName,
      code: newProfile.customerId,
      salary: newProfile.creditAmount,
      bankName: newProfile.bankName,
      accNo: newProfile.accountNumber,
      accName: newProfile.accountName,
      address: newProfile.customerAddress,
      workAt: newProfile.companyName,
      id: newProfile.idCard,
      idLocation: newProfile.idCardIssuePlace,
      idDate: newProfile.idCardIssueDate,
    }),
  };
  // accountName: 'Nguyen Van A';
  // accountNumber: '12091129099283';
  // bankName: 'SCB';
  // companyName: 'SGFintech';
  // creditAmount: '5000000';
  // customerAddress: '12 Hau Giang Quan 6';
  // customerId: 'SGF123';
  // customerName: 'Nguyen Van D';
  // idCard: '026062666';
  // idCardIssuePlace: 'CA TPHCM';
  // issueDate: '2020-12-01T00:00:00.000Z';
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
