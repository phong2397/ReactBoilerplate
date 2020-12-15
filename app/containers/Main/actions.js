/*
 *
 * Main actions
 *
 */

import { CHANGE_TAB, DEFAULT_ACTION, LOAD_PROFILE } from './constants';

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
