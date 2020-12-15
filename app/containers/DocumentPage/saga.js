import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  requestloadDocument,
  loadDocumentError,
  loadedListDocument,
  uploadDocumentSuccess,
  closeFormUpload,
} from './actions';
import { LOAD_DOCUMENT, ON_SUBMIT_DOCUMENT } from './constants';
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
    yield put(closeFormUpload());
  } catch (err) {
    yield put(loadDocumentError(err));
  }
}
export function* uploadDocument({ documentType, description, file }) {
  // customerPhone: customerPhone,
  // fileName: `img${new Date().toISOString()}`,
  // originalName: req.file.originalname,
  // mimetype: req.file.mimetype,
  // size: req.file.size,
  // description: description,
  // categoryId: categoryId,
  // img: filePngBuffer,
  // eslint-disable-next-line prefer-const
  let formData = new FormData();
  formData.append('customerPhone', '0973154950');
  formData.append('description', description);
  formData.append('categoryId', documentType);
  formData.append('image', file);
  // console.log({ documentType, description, file });
  const requestURL = `http://localhost:3456/file`;
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
