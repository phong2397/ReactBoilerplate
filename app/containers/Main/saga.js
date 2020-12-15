import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  deleteAccessToken,
  removeProifle,
  saveProfile,
} from '../../utils/storage';
import { loaddedProfile } from './actions';
import { LOAD_PROFILE } from './constants';
import { makeSelectCurrentPhone } from './selectors';
export function* loadProfile() {
  console.log('LOAD PROFILE 3');
  const phone = yield select(makeSelectCurrentPhone()); // Temp phone number for identity user
  const requesProfileURL = `/customers/profile/${phone}`;
  try {
    const responseProfile = yield call(request, requesProfileURL);
    const profile = {
      customerName: responseProfile.customerName,
      customerId: responseProfile.customerId,
      companyName: responseProfile.companyName,
      creditAmount: responseProfile.customerSalary,
      idCard: responseProfile.customerIdentity,
      customerAddress: responseProfile.customerAddress,
      idCardIssueDate: responseProfile.identityDate,
      idCardIssuePlace: responseProfile.identityLocation,
      bankName: responseProfile.bankName,
      accountNumber: responseProfile.bankAcc,
      accountName: responseProfile.accountName,
    };
    saveProfile(profile);
    yield put(loaddedProfile(profile));
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
