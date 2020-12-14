/*
 *
 * OrderDetailPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_ORDER_DETAIL,
  LOAD_ORDER_DETAIL_SUCCESS,
  LOAD_ORDER_DETAIL_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadingOrderDetail() {
  console.log('STEP 2');
  return {
    type: LOAD_ORDER_DETAIL,
  };
}

export function loadingOrderDetailSuccess(value) {
  console.log('STEP 3 Load success');
  return {
    type: LOAD_ORDER_DETAIL_SUCCESS,
    value,
  };
}

export function loadingOrderDetailError(error) {
  console.log('STEP 3 Load error');
  return {
    type: LOAD_ORDER_DETAIL_ERROR,
    error,
  };
}
