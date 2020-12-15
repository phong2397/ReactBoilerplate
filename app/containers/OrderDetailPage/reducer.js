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
    orderId: '',
    status: '',
    orderAmount: 0,
    submitTime: '',
  },
  appraisalStage: {
    status: '',
    approveTime: '',
  },
  disbursementStage: {
    status: '',
    accountName: '',
    accountNo: '',
    bankName: '',
  },
  repaymentStage: {
    status: '',
    repayTime: '',
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
