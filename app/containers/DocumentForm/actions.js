/*
 *
 * DocumentForm actions
 *
 */

//  requestloadDocument,
// loadDocumentError,
// uploadingDocument,
// uploadDocumentSuccess,

import {
  DEFAULT_ACTION,
  ON_SUBMIT_DOCUMENT,
  REQUEST_LOAD_DOCUMENT,
  REQUEST_LOAD_DOCUMENT_SUCCESS,
  REQUEST_LOAD_DOCUMENT_FAIL,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_ERROR,
  UPLOADING_DOCUMENT,
  LOADING,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function submitDocument({ data, isChangeDocument }) {
  return {
    type: ON_SUBMIT_DOCUMENT,
    data,
    isChangeDocument,
  };
}

export function requestLoadDocument() {
  return {
    type: REQUEST_LOAD_DOCUMENT,
  };
}

export function requestLoadDocumentSuccess(response) {
  return {
    type: REQUEST_LOAD_DOCUMENT_SUCCESS,
    response,
  };
}

export function requestLoadDocumentFail(error) {
  return {
    type: REQUEST_LOAD_DOCUMENT_FAIL,
    error,
  };
}

export function uploadingDocument() {
  return {
    type: UPLOADING_DOCUMENT,
  };
}

export function uploadDocumentSuccess(response) {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    response,
  };
}

export function uploadDocumentError(error) {
  return {
    type: UPLOAD_DOCUMENT_ERROR,
    error,
  };
}

export function loadingAction(loading) {
  return {
    type: LOADING,
    loading,
  };
}
