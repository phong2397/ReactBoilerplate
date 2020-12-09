/*
 *
 * Main actions
 *
 */

import { CHANGE_TAB, DEFAULT_ACTION } from './constants';

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
