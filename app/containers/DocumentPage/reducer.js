/*
 *
 * DocumentPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_DOCUMENT_SUCCESS,
  OPEN_FORM_UPLOAD,
  CLOSE_FORM_UPLOAD,
  ON_CHANGE_FILE,
  ON_CHANGE_DOCUMENT_TYPE,
  CHANGE_FILTER,
} from './constants';

export const initialState = {
  loading: true,
  openForm: false,
  documents: [],
  filter: -1,
  file: {},
};

/* eslint-disable default-case, no-param-reassign */
const documentPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DOCUMENT_SUCCESS:
        draft.loading = false;
        draft.documents = action.documents;
        break;
      case OPEN_FORM_UPLOAD:
        draft.openForm = true;
        break;
      case CLOSE_FORM_UPLOAD:
        draft.openForm = false;
        break;
      case ON_CHANGE_DOCUMENT_TYPE:
        draft.documentType = action.documentType;
        break;
      case ON_CHANGE_FILE:
        draft.file = action.file;
        break;
      case CHANGE_FILTER:
        draft.filter = action.value;
        break;
    }
  });

export default documentPageReducer;
