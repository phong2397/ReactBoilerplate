/*
 *
 * OrderDetailPage reducer
 *
 */
import produce from 'immer';
import { getCountBorrowInMonth } from 'utils/storage';
import {
  DEFAULT_ACTION,
  REQUEST_ORDER_BY_ID_SUCCESS,
  REQUEST_ORDER_BY_ID_FAIL,
  REQUEST_CUSTOMER_SUCCESS,
  REQUEST_CUSTOMER_FAIL,
  LOAD_STATE,
  LOADING,
  REQUEST_ORDER_DETAIL,
  REFRESH_INIT_STATE,
} from './constants';

import { numberWithCommas } from '../../utils/formater';
function formatDate(dateObject) {
  if (!dateObject) return '';
  const { date, time } = dateObject;
  const { year, month, day } = date;
  const { hour, minute, second } = time;
  function n2digit(n) {
    const nString = `00${n}`;
    return nString.slice(nString.length - 2, nString.length);
  }
  const dateString = `${n2digit(day)}-${n2digit(month)}-${year}`;
  const timeString = `${n2digit(hour)}:${n2digit(minute)}:${n2digit(second)}`;
  return `${dateString} ${timeString}`;
}
const { WAIT, WFS, ACTIVE, DONE, DENY } = {
  WAIT: 'wait',
  WFS: 'wfs',
  ACTIVE: 'act',
  DONE: 'done',
  DENY: 'deni',
};
function formatOrder(order) {
  const {
    borrow,
    createdDate,
    employeeDuyetDate,
    employeeThamdinhDate,
    updatedDate,
    feeBorrow,
    id,
    interestRate,
    status,
    // timeBorrow,
    description,
    updatedTimeBororw,
  } = order;

  const formattedOrder = {
    orderId: id,
    orderAmount: numberWithCommas(borrow),
    orderStatus: status,
    orderInterestRate: interestRate,
    orderFee: numberWithCommas(feeBorrow),
    orderTimeBorrow: getCountBorrowInMonth() || 0,
    orderAmountTotal: numberWithCommas(borrow + feeBorrow),
    orderDateRepay: '',
    description: description || '',
    updatedTimeBororw: formatDate(updatedTimeBororw),
  };

  if (status === WAIT) {
    formattedOrder.timeline = [
      'Đã nhận yêu cầu',
      'Đang chờ xét duyệt',
      'Giải ngân',
      'Thanh toán',
    ];
    formattedOrder.detailTimeline = [
      {
        stage: 'init',
        time: formatDate(createdDate),
        description: 'Đã nhận yêu cầu',
      },
    ];
    formattedOrder.orderStatusCode = 1;
  }

  if (status === WFS) {
    formattedOrder.timeline = [
      'Đã nhận yêu cầu',
      'Xét duyệt thành công',
      'Đang chờ giải ngân',
      'Thanh toán',
    ];
    formattedOrder.detailTimeline = [
      {
        stage: 'init',
        time: formatDate(createdDate),
        description: 'Đã nhận yêu cầu',
      },
      {
        stage: 'approve',
        time: formatDate(employeeThamdinhDate),
        description: 'Xét duyệt thành công',
      },
    ];
    formattedOrder.orderStatusCode = 2;
  }

  if (status === ACTIVE) {
    formattedOrder.timeline = [
      'Đã nhận yêu cầu',
      'Xét duyệt thành công',
      'Giải ngân thành công',
      'Chờ Thanh toán',
    ];
    formattedOrder.detailTimeline = [
      {
        stage: 'init',
        time: formatDate(createdDate),
        description: 'Đã nhận yêu cầu',
      },
      {
        stage: 'approve',
        time: formatDate(employeeThamdinhDate),
        description: 'Xét duyệt thành công',
      },
      {
        stage: 'disburse',
        time: formatDate(employeeDuyetDate),
        description: 'Giải ngân thành công',
        note:
          'Nội dung chuyển khoản: Hoten_CMND_Sodienthoai/madon (Chú ý: Số điện thoại đã đăng ký)',
      },
    ];
    formattedOrder.orderStatusCode = 3;
  }

  if (status === DONE) {
    formattedOrder.timeline = [
      'Đã nhận yêu cầu',
      'Xét duyệt thành công',
      'Giải ngân thành công',
      'Đã Thanh toán',
    ];
    formattedOrder.detailTimeline = [
      {
        stage: 'init',
        time: formatDate(createdDate),
        description: 'Đã nhận yêu cầu',
      },
      {
        stage: 'approve',
        time: formatDate(employeeThamdinhDate),
        description: 'Xét duyệt thành công',
      },
      {
        stage: 'disburse',
        time: formatDate(employeeDuyetDate),
        description: 'Giải ngân thành công',
      },
      {
        stage: 'payment',
        time: formatDate(updatedDate),
        description: 'Đã thanh toán',
      },
    ];
    formattedOrder.orderStatusCode = 4;
  }

  if (status === DENY) {
    // NOTE: tu choi giai ngan
    if (employeeDuyetDate) {
      formattedOrder.timeline = [
        'Đã nhận yêu cầu',
        'Xét duyệt thành công',
        'Giải ngân không thành công',
        'Thanh toán',
      ];
      formattedOrder.detailTimeline = [
        {
          stage: 'init',
          time: formatDate(createdDate),
          description: 'Đã nhận yêu cầu',
        },
        {
          stage: 'approve',
          time: formatDate(employeeThamdinhDate),
          description: 'Xét duyệt thành công',
        },
        {
          stage: 'disburse',
          time: formatDate(employeeDuyetDate),
          description: 'Giải ngân không thành công',
          note: formattedOrder.description,
        },
      ];
      formattedOrder.orderStatusCode = 2;
    }
    // NOTE: tham dinh that bai
    else {
      formattedOrder.timeline = [
        'Đã nhận yêu cầu',
        'Xét duyệt không thành công',
        'Giải ngân',
        'Thanh toán',
      ];
      formattedOrder.detailTimeline = [
        {
          stage: 'init',
          time: formatDate(createdDate),
          description: 'Đã nhận yêu cầu',
        },
        {
          stage: 'approve',
          time: formatDate(employeeThamdinhDate),
          description: 'Xét duyệt không thành công',
          note: formattedOrder.description,
        },
      ];
      formattedOrder.orderStatusCode = 1;
    }
  }

  return formattedOrder;
}

export const initialState = {
  order: {},
  customer: {},
  loading: false,
  loadState: { customer: false, order: false },
};

/* eslint-disable default-case, no-param-reassign */
const orderDetailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_ORDER_BY_ID_SUCCESS:
        draft.order = Object.assign({}, formatOrder(action.order));
        break;
      case REQUEST_ORDER_BY_ID_FAIL:
        break;
      case REQUEST_CUSTOMER_SUCCESS:
        draft.customer = Object.assign({}, action.customer);
        break;
      case REQUEST_CUSTOMER_FAIL:
        break;
      case REQUEST_ORDER_DETAIL:
        draft = initialState;
        break;
      case LOADING:
        draft.loading = action.loading;
        break;
      case LOAD_STATE:
        draft.loadState = action.loadState;
        break;
      case REFRESH_INIT_STATE:
        draft.order = {};
        draft.customer = {};
        break;
    }
  });

export default orderDetailPageReducer;
