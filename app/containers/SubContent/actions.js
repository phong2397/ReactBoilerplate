/*
 *
 * SubContent actions
 *
 */

import { DEFAULT_ACTION, GO_BACK } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function goBackAction() {
  return {
    type: GO_BACK,
  };
}
