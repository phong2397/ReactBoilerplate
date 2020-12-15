import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectCurrentPhone } from '../Main/selectors';
import {
  requestloadDocument,
  loadDocumentError,
  loadedListDocument,
  uploadDocumentSuccess,
  closeFormUpload,
} from './actions';
import { LOAD_DOCUMENT, ON_SUBMIT_DOCUMENT } from './constants';
export function* loadDocument() {
  const phone = yield select(makeSelectCurrentPhone());
  const requestURL = `http://13.212.189.237:3456/file/${phone}`;
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
    yield put(closeFormUpload());
  } catch (err) {
    yield put(loadDocumentError(err));
  }
}
export function* uploadDocument({ documentType, description, file }) {
  const phone = yield select(makeSelectCurrentPhone());
  const formData = new FormData();
  formData.append('customerPhone', phone);
  formData.append('description', description);
  formData.append('categoryId', documentType);
  formData.append('image', file);
  // console.log({ documentType, description, file });
  const requestURL = `http://13.212.189.237:3456/file`;
  const parameters = {
    method: 'POST',
    headers: new Headers({
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
    mode: 'cors', // no-cors, *cors, same-origin
    referrerPolicy: 'origin',
    body: formData,
  };
  try {
    const response = yield call(request, requestURL, parameters);
    yield put(uploadDocumentSuccess(response));
    yield put(requestloadDocument());
  } catch (err) {
    yield put(loadDocumentError(err));
  }
}
// Individual exports for testing
export default function* documentPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_DOCUMENT, loadDocument);
  yield takeLatest(ON_SUBMIT_DOCUMENT, uploadDocument);
}
