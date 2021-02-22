/*
 *
 * ConfirmPage reducer
 *
 */
import produce from 'immer';
import { getProductConfig, getProfile } from 'utils/storage';
import {
  DEFAULT_ACTION,
  HIDE_LOADING,
  REQUEST_BASIC_INFO_SUCCESS,
  REQUEST_ORDER_FAIL,
  REQUEST_OTP_SUCCESS,
  SHOW_LOADING,
  CLOSE_DIALOG,
  VERIFY_OTP_ERROR,
} from './constants';

export const initialState = {
  basicInfo: getProfile(),
  productConfig: getProductConfig(),
  data: null,
  errors: null,
  openDialog: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const confirmPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_BASIC_INFO_SUCCESS:
        draft.basicInfo = action.data.basicInfo;
        break;
      case REQUEST_OTP_SUCCESS:
        draft.data = action.response.Data;
        draft.openDialog = true;
        draft.errors = null;
        break;
      case VERIFY_OTP_ERROR:
        draft.errors = action.error;
        break;
      case REQUEST_ORDER_FAIL:
        draft.errors = action.error;
        break;
      case CLOSE_DIALOG:
        draft.openDialog = false;
        break;
      case SHOW_LOADING:
        draft.loading = true;
        break;
      case HIDE_LOADING:
        draft.loading = false;
        break;
    }
  });

export default confirmPageReducer;
