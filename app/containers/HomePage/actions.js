/*
 *
 * HomePage actions
 *
 */
import {
  ALERT_EMPTY_PROFILE,
  CALL_REQUEST_ORDER,
  CHANGE_SELECTED_AMOUNT,
  CLOSE_DIALOG,
  DEFAULT_ACTION,
  GO_TO_PROFILE,
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
export function requestOrder() {
  return {
    type: CALL_REQUEST_ORDER,
  };
}
export function alertEmptyProfile() {
  return {
    type: ALERT_EMPTY_PROFILE,
  };
}
export function confirmAlert() {
  return {
    type: CLOSE_DIALOG,
  };
}
export function goToProfile() {
  return {
    type: GO_TO_PROFILE,
  };
}
