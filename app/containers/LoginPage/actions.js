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
  CHECK_USER_EXIST,
  LOADING_LOGIN,
  GO_BACK_INPUT,
  LOAD_COMPANY_LIST,
  LOAD_COMPANY_LIST_SUCCESS,
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
export function checkUserExistAction({ phone, companyId }) {
  return {
    type: CHECK_USER_EXIST,
    phone,
    companyId,
  };
}
export function requestOtpAction(phone) {
  return {
    type: REQUEST_OTP,
    phone,
  };
}
export function loadRequestOtp(response) {
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
export function requestLoginAction(otp) {
  return {
    type: REQUEST_LOGIN,
    otp,
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
export function loadingRequest(loading) {
  return {
    type: LOADING_LOGIN,
    loading,
  };
}
export function goBackInput() {
  return {
    type: GO_BACK_INPUT,
  };
}
export function loadCompanyListAction() {
  return {
    type: LOAD_COMPANY_LIST,
  };
}
export function loadedCompanyList(response) {
  return {
    type: LOAD_COMPANY_LIST_SUCCESS,
    response,
  };
}
