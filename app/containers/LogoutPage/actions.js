/*
 *
 * LogoutPage actions
 *
 */

import { DEFAULT_ACTION, DO_LOGOUT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logoutAction() {
  return {
    type: DO_LOGOUT,
  };
}
