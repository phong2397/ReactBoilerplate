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
  REQUEST_LOGIN_ERROR,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_OTP_ERROR,
  REQUEST_OTP_SUCCESS,
} from './constants';

export const initialState = {
  companyId: '',
  phone: '',
  otp: '',
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_PHONE:
        console.log('PHONE CHANGE');
        draft.phone = action.phone;
        break;
      case CHANGE_OTP:
        console.log('OTP CHANGE');
        draft.otp = action.otp;
        break;
      case CHANGE_COMPANYID:
        console.log('COMPANY CHANGE');
        draft.companyId = action.companyId;
        break;
      case REQUEST_OTP_SUCCESS:
        console.log('REQUEST OTP SUCCESS');
        draft.error = '';
        draft.data = action.response.Data;
        break;
      case REQUEST_OTP_ERROR:
        console.log('REQUEST OTP');
        console.log(action);
        draft.error = action.error;
        break;
      case REQUEST_LOGIN_SUCCESS:
        console.log('REQUEST LOGIN SUCCESS');
        draft.error = '';
        draft.accessToken = action.response.Data;
        break;
      case REQUEST_LOGIN_ERROR:
        console.log('REQUEST LOGIN ERROR');
        console.log(action);
        draft.error = action.error;
        break;
    }
  });

export default loginPageReducer;
