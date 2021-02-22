/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_COMPANYID,
  CHANGE_OTP,
  CHANGE_PHONE,
  DEFAULT_ACTION,
  GO_BACK_INPUT,
  LOADING_LOGIN,
  LOAD_COMPANY_LIST_SUCCESS,
  REQUEST_LOGIN_ERROR,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_OTP_ERROR,
  REQUEST_OTP_SUCCESS,
} from './constants';

export const initialState = {
  loginStep: 0,
  companyId: '',
  phone: '',
  otp: '',
  error: '',
  errorServer: null,
  loadingButton: false,
  loading: false,
  companyList: [],
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PHONE:
        draft.phone = action.phone;
        break;
      case LOADING_LOGIN:
        draft.loading = action.loading;
        break;
      case CHANGE_OTP:
        draft.otp = action.otp;
        break;
      case CHANGE_COMPANYID:
        draft.companyId = action.companyId;
        break;
      case REQUEST_OTP_SUCCESS:
        draft.loginStep = 1;
        draft.error = '';
        draft.data = action.response.Data;
        draft.errorServer = null;
        break;
      case REQUEST_OTP_ERROR:
        draft.errorServer = action.error;
        break;
      case REQUEST_LOGIN_SUCCESS:
        draft.loginStep = 0;
        draft.companyId = '';
        draft.phone = '';
        draft.otp = '';
        draft.error = '';
        draft.loadingButton = false;
        draft.errorServer = null;
        break;
      case REQUEST_LOGIN_ERROR:
        draft.errorServer = action.error;
        break;
      case GO_BACK_INPUT:
        draft.loginStep = 0;
        break;
      case LOAD_COMPANY_LIST_SUCCESS:
        draft.companyList = action.response;
        break;
    }
  });

export default loginPageReducer;
