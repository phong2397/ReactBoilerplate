import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { loadDocumentError, loadedListDocument } from './actions';
import { LOAD_DOCUMENT } from './constants';
export function* loadDocument() {
  const requestURL = `http://localhost:3456/file/0973154950`;
  const parameters = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    yield put(loadedListDocument(response));
    console.log(response);
  } catch (err) {
    yield put(loadDocumentError(err));
  }
}
// Individual exports for testing
export default function* documentPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_DOCUMENT, loadDocument);
}
