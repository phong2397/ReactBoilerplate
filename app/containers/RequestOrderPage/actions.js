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
    type: SEND_ORDER_SUCCESS,
    error,
  };
}
