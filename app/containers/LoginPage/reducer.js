/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_COMPANYID,
  CHANGE_PHONE,
  DEFAULT_ACTION,
  REQUEST_OTP,
} from './constants';

export const initialState = {
  companyId: '123123',
  phone: '123123',
  otp: '',
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
      case CHANGE_COMPANYID:
        draft.companyId = action.companyId;
        break;
      case REQUEST_OTP:
        console.log('REQUEST OTP');
        break;
    }
  });

export default loginPageReducer;
