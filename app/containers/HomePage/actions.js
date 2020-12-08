/*
 *
 * HomePage actions
 *
 */

import { CHANGE_SELECTED_AMOUNT, DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeSelectAmount(value) {
  return {
    type: CHANGE_SELECTED_AMOUNT,
    value,
  };
}
