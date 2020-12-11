/*
 *
 * ProfileInfoPage actions
 *
 */

import { LOAD_DATA_PROFILE, DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadProfile() {
  return {
    type: LOAD_DATA_PROFILE,
  };
}

// export function requestUpdateDataProfile(value) {
//   return {
//     type: REQUEST_UPDATE_DATA_PROFILE,
//     value,
//   };
// }

// export function requestUpdateDataProfileSuccess(value) {
//   return {
//     type: REQUEST_UPDATE_DATA_PROFILE_SUCCESS,
//     value,
//   };
// }

// export function requestUpdateDataProfileError(value) {
//   return {
//     type: REQUEST_UPDATE_DATA_PROFILE_ERROR,
//     value,
//   };
// }
