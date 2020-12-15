/*
 *
 * Main actions
 *
 */

import {
  CHANGE_TAB,
  DEFAULT_ACTION,
  LOAD_PROFILE,
  LOAD_PROFILE_ERROR,
  LOAD_PROFILE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changeTab(value) {
  return {
    type: CHANGE_TAB,
    value,
  };
}
export function loadProfile(phone) {
  return {
    type: LOAD_PROFILE,
    phone,
  };
}
export function loadProfileSuccess() {
  return {
    type: LOAD_PROFILE_SUCCESS,
  };
}
export function loadProfileError() {
  return {
    type: LOAD_PROFILE_ERROR,
  };
}
