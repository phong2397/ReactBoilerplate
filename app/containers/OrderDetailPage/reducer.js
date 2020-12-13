/*
 *
 * OrderDetailPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOAD_ORDER_DETAIL_SUCCESS } from './constants';
import {
  formatInitStage,
  formatAppraisalStage,
  formatDisbursementStage,
  formatRepaymentStage,
} from './formater';

export const initialState = {
  loading: true,
  orderId: '0',
  initStage: {
    orderId: '0010',
    status: 'Khởi tạo',
    orderAmount: 5000000,
    submitTime: '20/11/2020 8h30',
  },
  appraisalStage: {
    status: 'Yêu cầu được chấp nhận',
    approveTime: '20/11/2020 11h30',
  },
  disbursementStage: {
    status: 'Đợi giải ngân',
    accountName: 'Nguyen Van A',
    accountNo: '130342340001',
    bankName: 'SCB',
  },
  repaymentStage: {
    status: 'Thanh toán',
    repayTime: '30/11/2020 17h30',
  },
};

/* eslint-disable default-case, no-param-reassign */
const orderDetailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_ORDER_DETAIL_SUCCESS:
        console.log('REDUCER ACTION: ', action);
        draft.orderId = action.value.orderId.toString();
        draft.initStage = formatInitStage(action.value);
        draft.appraisalStage = formatAppraisalStage(action.value);
        draft.disbursementStage = formatDisbursementStage(action.value);
        draft.repaymentStage = formatRepaymentStage(action.value);
        console.log('DRAFTS: ', draft);
    }
  });

export default orderDetailPageReducer;
