/*
 *
 * HistoryPage actions
 *
 */
import {
  DEFAULT_ACTION,
  LOAD_ORDERS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadingOrders() {
  console.log('STEP 2');
  return {
    type: LOAD_ORDERS,
  };
}
export function loadOrdersSuccess(value) {
  return {
    type: LOAD_ORDERS_SUCCESS,
    value,
  };
}
export function loadOrdersError(value) {
  return {
    type: LOAD_ORDERS_ERROR,
    value,
  };
}
