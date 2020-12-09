/*
 *
 * ProfileInfoPage actions
 *
 */

import {
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

export function updateDataProfile(value) {
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
