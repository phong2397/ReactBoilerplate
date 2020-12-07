import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import moment from 'moment';
import { makeSelectPhone } from './selectors';
import { REQUEST_OTP } from './constants';
import { loadRequestOtp } from './actions';
import { repoLoadingError } from '../App/actions';

/**
 * Github repos request/response handler
 */
export function* requestOtp() {
  // const companyId = yield select(makeSelectCompanyId());
  const phone = yield select(makeSelectPhone());
  const requestURL = `http://52.76.217.79:8080/smsgateway/api/v1/`;
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY=',
    },
    body: JSON.stringify({
      RequestDateTime: `${moment().format('YYYYMMDDhhmms')}`,
      RequestID: '{{$guid}}',
      FunctionName: 'SENDSMSOTP',
      Data: {
        tel: `${phone}`,
        content:
          'VNAY.COM.VN Ma xac minh cua ban la ... , ma xac minh nay chi hieu luc trong 10 phut',
      },
    }),
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, parameters);
    console.log(response);
    yield put(loadRequestOtp(response));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// /**
//  * Root saga manages watcher lifecycle
//  */
// export default function* githubData() {
//   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(LOAD_REPOS, getRepos);
// }

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_OTP, requestOtp);
}
