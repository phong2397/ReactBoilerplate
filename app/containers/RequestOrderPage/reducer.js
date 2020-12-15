/*
 *
 * RequestOrderPage reducer
 *
 */
import produce from 'immer';
import {
  CHECK_TERM,
  CLOSE_MODAL,
  CLOSE_TERM_MODAL,
  DEFAULT_ACTION,
  OPEN_MODAL,
  OPEN_TERM_MODAL,
  SEND_ORDER_ERROR,
  SEND_ORDER_SUCCESS,
} from './constants';

export const initialState = {
  openModal: false,
  checkTerm: false,
  openTerm: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const requestOrderPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log(state);
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
      case OPEN_TERM_MODAL:
        draft.openTerm = true;
        break;
      case CLOSE_TERM_MODAL:
        draft.openTerm = false;
        break;
      case SEND_ORDER_SUCCESS:
        draft.error = null;
        draft.checkTerm = false;
        break;
      case SEND_ORDER_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default requestOrderPageReducer;
