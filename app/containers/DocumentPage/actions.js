/*
 *
 * DocumentPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_DOCUMENT,
  LOAD_DOCUMENT_ERROR,
  LOAD_DOCUMENT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadDocument() {
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
