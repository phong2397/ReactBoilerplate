/*
 *
 * HomePage actions
 *
 */

import {
  CHANGE_SELECTED_AMOUNT,
  DEFAULT_ACTION,
  LOAD_PRODUCT_CONFIG,
  LOAD_PRODUCT_ERROR,
  LOAD_PRODUCT_SUCCESS,
} from './constants';

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
export function loadingProductConfig() {
  return {
    type: LOAD_PRODUCT_CONFIG,
  };
}
export function loadedProductConfig(productConfig) {
  return {
    type: LOAD_PRODUCT_SUCCESS,
    config: productConfig,
  };
}
export function loadProductError(error) {
  return {
    type: LOAD_PRODUCT_ERROR,
    error,
  };
}
