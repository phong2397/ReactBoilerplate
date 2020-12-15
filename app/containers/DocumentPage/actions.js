/*
 *
 * DocumentPage actions
 *
 */

import {
  CHANGE_FILTER,
  CLOSE_FORM_UPLOAD,
  DEFAULT_ACTION,
  LOAD_DOCUMENT,
  LOAD_DOCUMENT_ERROR,
  LOAD_DOCUMENT_SUCCESS,
  ON_CHANGE_DESCRIPTION,
  ON_CHANGE_DOCUMENT_TYPE,
  ON_CHANGE_FILE,
  ON_SUBMIT_DOCUMENT,
  ON_UPLOAD_ERROR,
  ON_UPLOAD_SUCCESS,
  OPEN_FORM_UPLOAD,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function requestloadDocument() {
  return {
    type: LOAD_DOCUMENT,
  };
}
export function loadedListDocument(documents) {
  return {
    type: LOAD_DOCUMENT_SUCCESS,
    documents,
  };
}
export function loadDocumentError(error) {
  return {
    type: LOAD_DOCUMENT_ERROR,
    error,
  };
}
export function closeFormUpload() {
  return {
    type: CLOSE_FORM_UPLOAD,
  };
}
export function openFormUpload() {
  return {
    type: OPEN_FORM_UPLOAD,
  };
}
export function onChangeFile(file) {
  return {
    type: ON_CHANGE_FILE,
    file,
  };
}
export function changeTypeDocument(type) {
  return {
    type: ON_CHANGE_DOCUMENT_TYPE,
    documentType: type,
  };
}
export function changeDescription(description) {
  return {
    type: ON_CHANGE_DESCRIPTION,
    description,
  };
}
export function submitDocumentUpload({ documentType, description, file }) {
  return {
    type: ON_SUBMIT_DOCUMENT,
    documentType,
    description,
    file,
  };
}
export function uploadDocumentSuccess(response) {
  return {
    type: ON_UPLOAD_SUCCESS,
    response,
  };
}
export function uploadDocumentError(error) {
  return {
    type: ON_UPLOAD_ERROR,
    error,
  };
}
export function changeFiler(value) {
  return {
    type: CHANGE_FILTER,
    value,
  };
}
