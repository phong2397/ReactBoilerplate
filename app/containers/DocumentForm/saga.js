// import { take, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import request, { requestImage } from 'utils/request';
import { getAccessToken, getUserInfoRoute } from 'utils/storage';
import {
  // requestLoadDocument,
  uploadDocumentError,
  uploadingDocument,
  uploadDocumentSuccess,
  requestLoadDocumentSuccess,
  requestLoadDocumentFail,
  loadingAction,
} from './actions';
import { ON_SUBMIT_DOCUMENT, REQUEST_LOAD_DOCUMENT } from './constants';

function* addForm(form, field, file) {
  if (file.isHandObject && file.preview !== '') {
    const url = file.preview.replace('https://dev.sgft.info', '');
    const blob = yield call(requestImage, url);
    const metadata = { type: 'image/*' };
    const imageName = file.preview.split('@')[1];
    const image = new File([blob], imageName, metadata);
    return form.append(field, image);
  }
  return form.append(field, file);
}

function setEmptyFormField(form, field) {
  return form.append(field, new File([new Blob()], '', { type: 'image/*' }));
}

export function* uploadDocument({ data, isChangeDocument }) {
  // check change document
  const userInfoRoute = yield call(getUserInfoRoute);
  if (isChangeDocument) {
    yield put(loadingAction(true));
    const {
      imgsIdCard,
      imgsPayslip,
      imgsCont,
      imgsHealth,
      imgsAppx,
      imgsSalary,
      imgsSocial,
    } = data;

    // const customerPhone = getPhone();
    const accessToken = yield call(getAccessToken);
    const formData = new FormData();

    yield all(imgsIdCard.map(file => call(addForm, formData, 'cmnd', file)));
    yield all(
      imgsPayslip.map(file => call(addForm, formData, 'payslip', file)),
    );
    yield all(imgsCont.map(file => call(addForm, formData, 'contract', file)));
    yield all(imgsHealth.map(file => call(addForm, formData, 'health', file)));
    yield all(imgsAppx.map(file => call(addForm, formData, 'appendix', file)));
    yield all(imgsSalary.map(file => call(addForm, formData, 'salary', file)));
    yield all(imgsSocial.map(file => call(addForm, formData, 'social', file)));

    // Set empty field would be option when it not existed
    if (!imgsCont.length || imgsCont[0].preview === '')
      setEmptyFormField(formData, 'contract');
    if (!imgsAppx.length || imgsAppx[0].preview === '')
      setEmptyFormField(formData, 'appendix');
    if (!imgsSalary.length || imgsSalary[0].preview === '')
      setEmptyFormField(formData, 'salary');
    if (!imgsSocial.length || imgsSocial[0].preview === '')
      setEmptyFormField(formData, 'social');

    const requestURL = `/customergateway/api/v2/upload/${accessToken}`;
    const parameters = {
      method: 'POST',
      headers: new Headers({
        // prettier-ignore
        'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
      }),
      body: formData,
    };
    try {
      yield put(uploadingDocument());
      const response = yield call(request, requestURL, parameters);
      if (response.ResponseCode === '000') {
        yield put(uploadDocumentSuccess(response));

        if (userInfoRoute === 'create-order')
          yield put(push('/yeucau/chon-muc-ung'));
        else yield put(push('/yeucau/hoan-thanh-cap-nhat'));
      } else {
        yield put(uploadDocumentError(response.ResponseCode));
      }
    } catch (err) {
      yield put(uploadDocumentError(err));
    }
  } else {
    console.log('ROUTE: ', userInfoRoute);
    if (userInfoRoute === 'create-order')
      yield put(push('/yeucau/chon-muc-ung'));
    else yield put(push('/yeucau/hoan-thanh-cap-nhat'));
  }

  yield put(loadingAction(false));
}
// Individual exports for testing

export function* requestLoadDocument() {
  yield put(loadingAction(true));
  // const phone = getPhone();
  const accessToken = yield call(getAccessToken);
  const requestURL = `/customergateway/api/v2/document/${accessToken}`;
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
    yield put(requestLoadDocumentSuccess(response));
  } catch (err) {
    yield put(requestLoadDocumentFail(err));
  }
  yield put(loadingAction(false));
}

export default function* documentFormSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ON_SUBMIT_DOCUMENT, uploadDocument);
  yield takeLatest(REQUEST_LOAD_DOCUMENT, requestLoadDocument);
}
