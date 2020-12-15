/*
 *
 * DocumentPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOAD_DOCUMENT_SUCCESS } from './constants';

export const initialState = {
  loading: true,
  documents: [],
};

/* eslint-disable default-case, no-param-reassign */
const documentPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DOCUMENT_SUCCESS:
        draft.documents = action.documents;
        break;
    }
  });

export default documentPageReducer;
