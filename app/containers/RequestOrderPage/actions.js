/*
 *
 * RequestOrderPage actions
 *
 */

import {
  DEFAULT_ACTION,
  OPEN_MODAL,
  SEND_ORDER_REQUEST,
  CONFIRM_ORDER,
  CLOSE_MODAL,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  OPEN_TERM_MODAL,
  CHECK_TERM,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function openModalAction() {
  return {
    type: OPEN_MODAL,
  };
}
export function closeModalAction() {
  return {
    type: CLOSE_MODAL,
  };
}
export function confirmOrderAction() {
  return {
    type: CONFIRM_ORDER,
  };
}

export function sendOrderRequestAction() {
  console.log('SEND ORDER REQUEST');
  return {
    type: SEND_ORDER_REQUEST,
  };
}
export function sendOrderSuccess(response) {
  return {
    type: SEND_ORDER_SUCCESS,
    response,
  };
}
export function sendOrderError(error) {
  return {
    type: SEND_ORDER_ERROR,
    error,
  };
}
export function checkTermPolicy(checked) {
  return {
    type: CHECK_TERM,
    checked,
  };
}
export function openTermModal() {
  return {
    type: OPEN_TERM_MODAL,
  };
}
