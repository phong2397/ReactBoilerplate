/*
 *
 * RequestOrderPage reducer
 *
 */
import produce from 'immer';
import {
  CHECK_TERM,
  CLOSE_MODAL,
  DEFAULT_ACTION,
  OPEN_MODAL,
} from './constants';

export const initialState = {
  openModal: false,
  checkTerm: false,
};

/* eslint-disable default-case, no-param-reassign */
const requestOrderPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case OPEN_MODAL:
        draft.openModal = true;
        break;
      case CLOSE_MODAL:
        draft.openModal = false;
        break;
      case CHECK_TERM:
        draft.checkTerm = action.checked;
        break;
    }
  });

export default requestOrderPageReducer;
