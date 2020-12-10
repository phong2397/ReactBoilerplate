/*
 *
 * ProfileInfoPage actions
 *
 */

import {
  LOAD_DATA_PROFILE,
  LOAD_DATA_PROFILE_SUCCESS,
  LOAD_DATA_PROFILE_ERROR,
  REQUEST_UPDATE_DATA_PROFILE,
  REQUEST_UPDATE_DATA_PROFILE_SUCCESS,
  REQUEST_UPDATE_DATA_PROFILE_ERROR,
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadDataProfile() {
  console.log('LOAD DATA 1');
  return {
    type: LOAD_DATA_PROFILE,
  };
}

export function loadDataProfileSuccess(response) {
  return {
    type: LOAD_DATA_PROFILE_SUCCESS,
    response,
  };
}

export function loadDataProfileError(error) {
  return {
    type: LOAD_DATA_PROFILE_ERROR,
    error,
  };
}

export function requestUpdateDataProfile(value) {
  console.log('REQUEST PROFILE DATA 1');

  return {
    type: REQUEST_UPDATE_DATA_PROFILE,
    value,
  };
}

export function requestUpdateDataProfileSuccess(value) {
  return {
    type: REQUEST_UPDATE_DATA_PROFILE_SUCCESS,
    value,
  };
}

export function requestUpdateDataProfileError(value) {
  return {
    type: REQUEST_UPDATE_DATA_PROFILE_ERROR,
    value,
  };
}
