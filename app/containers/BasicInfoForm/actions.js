/*
 *
 * BasicInfoForm actions
 *
 */

import {
  CHANGE_BIRTHDAY,
  CHANGE_DISTRICT,
  CHANGE_PROVINCE,
  CHANGE_WARD,
  DEFAULT_ACTION,
  LOAD_LOCATION_ERROR,
  LOAD_LOCATION_SUCCESS,
  REQUEST_LOAD_LOCATION,
  UPDATE_BASIC_INFO,
  UPDATE_BASIC_INFO_SUCCESS,
  UPDATE_BASIC_INFO_FAIL,
  REQUEST_BASIC_INFO_SUCCESS,
  REQUEST_BASIC_INFO_FAIL,
  REQUEST_BASIC_INFO,
  REQUEST_SKIP,
  REQUEST_COMPANY_SUCCESS,
  REQUEST_COMPANY_ERROR,
  REQUEST_COMPANY,
  LOAD_BASIC_INFO,
  LOADING_DATA,
  LOADING_STATE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changeBirthday(birthday) {
  return {
    type: CHANGE_BIRTHDAY,
    birthday,
  };
}
export function updateBasicInfoAction(basicInfo) {
  return {
    type: UPDATE_BASIC_INFO,
    basicInfo,
  };
}
export function updateSuccess() {
  return {
    type: UPDATE_BASIC_INFO_SUCCESS,
  };
}
export function updateFail(errors) {
  return {
    type: UPDATE_BASIC_INFO_FAIL,
    errors,
  };
}
export function requestLoadLocation() {
  return {
    type: REQUEST_LOAD_LOCATION,
  };
}
export function loadedLocation(location) {
  return {
    type: LOAD_LOCATION_SUCCESS,
    location,
  };
}
export function loadLocationErrror(error) {
  return {
    type: LOAD_LOCATION_ERROR,
    error,
  };
}
export function changeProvince(province) {
  return {
    type: CHANGE_PROVINCE,
    province,
  };
}
export function changeDistrict(district) {
  return {
    type: CHANGE_DISTRICT,
    district,
  };
}
export function changeWard(ward) {
  return {
    type: CHANGE_WARD,
    ward,
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
export function getBasicInfo() {
  return {
    type: REQUEST_BASIC_INFO,
  };
}
export function getBasicInfoFail(err) {
  return {
    type: REQUEST_BASIC_INFO_FAIL,
    err,
  };
}
export function skipInput() {
  return {
    type: REQUEST_SKIP,
  };
}
export function requestLoadCompany() {
  return {
    type: REQUEST_COMPANY,
  };
}
export function loadedCompanyInfo(response) {
  return {
    type: REQUEST_COMPANY_SUCCESS,
    response,
  };
}
export function loadCompanyInfoError(error) {
  return {
    type: REQUEST_COMPANY_ERROR,
    error,
  };
}
export function loadingAction(loading) {
  return {
    type: LOADING_DATA,
    loading,
  };
}
export function loadBasicInfoForm() {
  return {
    type: LOAD_BASIC_INFO,
  };
}
export function loadStateAction(loadingState) {
  return {
    type: LOADING_STATE,
    loadingState,
  };
}
