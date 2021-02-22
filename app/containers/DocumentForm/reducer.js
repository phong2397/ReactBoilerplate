/*
 *
 * DocumentForm reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_ERROR,
  ON_SUBMIT_DOCUMENT,
  REQUEST_LOAD_DOCUMENT_SUCCESS,
  REQUEST_LOAD_DOCUMENT_FAIL,
  LOADING,
} from './constants';

function setObjectDocument(objString, type) {
  const listDocs = Object.values(JSON.parse(objString));
  return listDocs.map((doc, index) => ({
    id: type + index,
    preview:
      doc.split('@')[1] !== '' ? doc.replace('https://dev.sgft.info', '') : '',
    name: doc.split('@')[1],
    isHandObject: true,
  }));
}

function formatDocument(rawData) {
  return {
    idCard: setObjectDocument(rawData.cmnd, 'idcard'),
    idCardB: setObjectDocument(rawData.cmnd, 'idcardb'),
    payslip: setObjectDocument(rawData.payslip, 'payslip'),
    contract: setObjectDocument(rawData.contract, 'contract'),
    health: setObjectDocument(rawData.health, 'health'),
    appendix: setObjectDocument(rawData.appendix, 'appendix'),
    salary: setObjectDocument(rawData.salary, 'salary'),
    social: setObjectDocument(rawData.social, 'social'),
  };
}

function getError(errorObj) {
  const errorCode = errorObj
    .toString()
    .split(':')[1]
    .trim();

  let errorMsg = '';
  if (errorCode === '400')
    errorMsg = 'Bạn chưa bổ sung đầy đủ các tài liệu được yêu cầu';
  else if (errorCode === '413')
    errorMsg = 'Bạn đã gửi quá nhiều files hoặc file có dung lượng quá lớn';
  else errorMsg = 'Đã có lỗi xảy ra';

  return {
    errorCode,
    errorMsg,
  };
}

export const initialState = {
  document: {},
  noticeError: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const documentFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case UPLOAD_DOCUMENT_SUCCESS:
        draft.noticeError = { error: false, errorCode: 0 };
        break;
      case UPLOAD_DOCUMENT_ERROR:
        draft.noticeError = {
          error: true,
          ...getError(action.error),
        };
        break;
      case REQUEST_LOAD_DOCUMENT_SUCCESS:
        draft.documents = formatDocument(action.response);
        break;
      case REQUEST_LOAD_DOCUMENT_FAIL:
        draft.documents = {
          idCard: setObjectDocument('{"1":"/upload/0@"}', 'idcard'),
          idCardB: setObjectDocument('{"1":"/upload/0@"}', 'idcardb'),
          payslip: setObjectDocument('{"1":"/upload/0@"}', 'payslip'),
          contract: setObjectDocument('{"1":"/upload/0@"}', 'contract'),
          health: setObjectDocument('{"1":"/upload/0@"}', 'health'),
          appendix: setObjectDocument('{"1":"/upload/0@"}', 'appendix'),
          salary: setObjectDocument('{"1":"/upload/0@"}', 'salary'),
          social: setObjectDocument('{"1":"/upload/0@"}', 'social'),
        };
        break;
      case ON_SUBMIT_DOCUMENT:
        draft.noticeError = { error: false, errorCode: 0 };
        break;
      case LOADING:
        draft.loading = action.loading;
        break;
    }
  });

export default documentFormReducer;
