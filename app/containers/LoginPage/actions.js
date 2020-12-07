/*
 *
 * LoginPage actions
 *
 */

import {
  CHANGE_PHONE,
  CHANGE_COMPANYID,
  DEFAULT_ACTION,
  REQUEST_LOGIN,
  REQUEST_OTP,
  REQUEST_OTP_ERROR,
  REQUEST_OTP_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changePhone(phone) {
  return {
    type: CHANGE_PHONE,
    phone,
  };
}
export function changeCompanyId(companyId) {
  console.log(companyId);
  return {
    type: CHANGE_COMPANYID,
    companyId,
  };
}
export function requestLoginAction() {
  return {
    type: REQUEST_LOGIN,
  };
}
export function requestOtpAction() {
  console.log('Request OTP 2');
  return {
    type: REQUEST_OTP,
  };
}
export function loadRequestOtp(response) {
  return {
    type: REQUEST_OTP_SUCCESS,
    response,
  };
}
export function requestOtpError(err) {
  return {
    type: REQUEST_OTP_ERROR,
    err,
  };
}
