/*
 *
 * LoginPage actions
 *
 */

import {
  CHANGE_PHONE,
  CHANGE_COMPANYID,
  CHANGE_OTP,
  DEFAULT_ACTION,
  REQUEST_OTP,
  REQUEST_OTP_ERROR,
  REQUEST_OTP_SUCCESS,
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_ERROR,
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
  return {
    type: CHANGE_COMPANYID,
    companyId,
  };
}
export function changeOtp(otp) {
  return {
    type: CHANGE_OTP,
    otp,
  };
}
export function requestOtpAction() {
  console.log('Request OTP 2');
  return {
    type: REQUEST_OTP,
  };
}
export function loadRequestOtp(response) {
  console.log('REQUEST OTP SUCCESS');
  return {
    type: REQUEST_OTP_SUCCESS,
    response,
  };
}
export function requestOtpError(error) {
  return {
    type: REQUEST_OTP_ERROR,
    error,
  };
}
export function requestLoginAction() {
  return {
    type: REQUEST_LOGIN,
  };
}
export function loadLoginSuccess(response) {
  return {
    type: REQUEST_LOGIN_SUCCESS,
    response,
  };
}
export function requestLoginError(error) {
  return {
    type: REQUEST_LOGIN_ERROR,
    error,
  };
}
