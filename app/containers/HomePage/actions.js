/*
 *
 * HomePage actions
 *
 */

import {
  CHANGE_ACTIVE_STEP,
  CHANGE_PROFILE_NAME,
  DEFAULT_ACTION,
  LOAD_BASIC_INFO,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changeActiveStep(step) {
  return {
    type: CHANGE_ACTIVE_STEP,
    step,
  };
}
export function loadBasicInfo() {
  return {
    type: LOAD_BASIC_INFO,
  };
}
export function changeProfileName(name) {
  return {
    type: CHANGE_PROFILE_NAME,
    name,
  };
}
