/*
 *
 * ConfirmPage actions
 *
 */
import { REQUEST_OTP_ERROR } from '../LoginPage/constants';
import { REQUEST_ORDER } from '../OrderForm/constants';
import {
  DEFAULT_ACTION,
  REQUEST_BASIC_INFO,
  REQUEST_BASIC_INFO_SUCCESS,
  REQUEST_BASIC_INFO_FAIL,
  REQUEST_ORDER_SUCCESS,
  REQUEST_ORDER_FAIL,
  REQUEST_OTP,
  REQUEST_OTP_SUCCESS,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERROR,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SHOW_LOADING,
  HIDE_LOADING,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getBasicInfo() {
  return {
    type: REQUEST_BASIC_INFO,
  };
}

export function getBasicInfoSuccess({ basicInfo, rawData }) {
  return {
    type: REQUEST_BASIC_INFO_SUCCESS,
    data: {
      basicInfo,
      rawData,
    },
  };
}
export function getBasicInfoFail(err) {
  return {
    type: REQUEST_BASIC_INFO_FAIL,
    err,
  };
}
export function requestOrderAction() {
  return {
    type: REQUEST_ORDER,
  };
}

export function requestOrderSuccess(response) {
  return {
    type: REQUEST_ORDER_SUCCESS,
    response,
  };
}

export function requestOrderFail(error) {
  return {
    type: REQUEST_ORDER_FAIL,
    error,
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
export function verifyOtp(otp) {
  return {
    type: VERIFY_OTP,
    otp,
  };
}
export function verifySuccess(response) {
  return {
    type: VERIFY_OTP_SUCCESS,
    response,
  };
}
export function verifyError(error) {
  return {
    type: VERIFY_OTP_ERROR,
    error,
  };
}
export function setOpenDialog(open) {
  return {
    type: OPEN_DIALOG,
    open,
  };
}
export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  };
}
export function showLoading() {
  return {
    type: SHOW_LOADING,
  };
}
export function hideLoadingg() {
  return {
    type: HIDE_LOADING,
  };
}
