/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, REQUEST_LOGIN } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function requestLoginAction() {
  return {
    type: REQUEST_LOGIN,
  };
}
