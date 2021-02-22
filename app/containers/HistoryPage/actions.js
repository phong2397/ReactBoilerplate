/*
 *
 * HistoryPage actions
 *
 */

import {
  DEFAULT_ACTION,
  REQUEST_ORDER_LIST_BY_PHONE,
  REQUEST_ORDER_LIST_BY_PHONE_SUCCESS,
  REQUEST_ORDER_LIST_BY_PHONE_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestOrderListByPhone(phone) {
  return {
    type: REQUEST_ORDER_LIST_BY_PHONE,
    phone,
  };
}

export function requestOrderListByPhoneSuccess({ orderList, rawData }) {
  return {
    type: REQUEST_ORDER_LIST_BY_PHONE_SUCCESS,
    data: {
      orderList,
      rawData,
    },
  };
}

export function requestOrderListByPhoneFail(err) {
  return {
    type: REQUEST_ORDER_LIST_BY_PHONE_FAIL,
    err,
  };
}
