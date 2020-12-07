/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, REQUEST_OTP } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_OTP:
        break;
    }
  });

export default loginPageReducer;
