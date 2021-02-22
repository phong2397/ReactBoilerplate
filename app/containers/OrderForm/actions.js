/*
 *
 * OrderForm actions
 *
 */

import {
  CHANGE_VALUE,
  DEFAULT_ACTION,
  LOAD_PRODUCT_CONFIG,
  LOAD_PRODUCT_ERROR,
  LOAD_PRODUCT_SUCCESS,
  REQUEST_ORDER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changeValue(value) {
  return {
    type: CHANGE_VALUE,
    value,
  };
}

export function loadProductConfig() {
  return {
    type: LOAD_PRODUCT_CONFIG,
  };
}
export function loadedProductConfig(config) {
  return {
    type: LOAD_PRODUCT_SUCCESS,
    config,
  };
}
export function loadProductError(error) {
  return {
    type: LOAD_PRODUCT_ERROR,
    error,
  };
}
export function requestOrder(order) {
  return {
    type: REQUEST_ORDER,
    order,
  };
}
