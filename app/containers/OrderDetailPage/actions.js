/*
 *
 * OrderDetailPage actions
 *
 */

import {
  DEFAULT_ACTION,
  REQUEST_ORDER_BY_ID,
  REQUEST_ORDER_BY_ID_SUCCESS,
  REQUEST_ORDER_BY_ID_FAIL,
  REQUEST_CUSTOMER,
  REQUEST_CUSTOMER_SUCCESS,
  REQUEST_CUSTOMER_FAIL,
  LOAD_STATE,
  LOADING,
  REQUEST_ORDER_DETAIL,
  REFRESH_INIT_STATE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestOrderById(id) {
  return {
    type: REQUEST_ORDER_BY_ID,
    data: id,
  };
}
export function requestOrderByIdSuccess(order) {
  return {
    type: REQUEST_ORDER_BY_ID_SUCCESS,
    order,
  };
}
export function requestOrderByIdFail(err) {
  return {
    type: REQUEST_ORDER_BY_ID_FAIL,
    err,
  };
}

export function requestCustomer() {
  return {
    type: REQUEST_CUSTOMER,
  };
}

export function requestCustomerSuccess(customer) {
  return {
    type: REQUEST_CUSTOMER_SUCCESS,
    customer,
  };
}

export function requestCustomerFail(error) {
  return {
    type: REQUEST_CUSTOMER_FAIL,
    error,
  };
}
export function loadingAction(loading) {
  return {
    type: LOADING,
    loading,
  };
}
export function loadStateAction(loadState) {
  return {
    type: LOAD_STATE,
    loadState,
  };
}
export function requestOrderDetail() {
  return {
    type: REQUEST_ORDER_DETAIL,
  };
}

export function refreshInitState(state) {
  return {
    type: REFRESH_INIT_STATE,
    state,
  };
}
