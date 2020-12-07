/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_COMPANYID, CHANGE_PHONE, DEFAULT_ACTION } from './constants';

export const initialState = {
  companyId: '',
  phone: '',
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
        console.log('COMPANY CHANGE');
        draft.companyId = action.companyId;
        break;
      // case REQUEST_OTP:
      //   console.log('REQUEST OTP');
      //   break;
    }
  });

export default loginPageReducer;
