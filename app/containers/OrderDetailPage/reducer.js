/*
 *
 * OrderDetailPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  initStage: {
    orderId: '0010',
    orderAmount: '5000000',
    submitTime: '20/11/2020 8h30',
  },
  appraisalStage: {
    approveTime: '20/11/2020 11h30',
  },
  disbursementStage: {
    accountName: 'Nguyen Van A',
    accountNo: '130342340001',
    bankName: 'SCB',
  },
  repaymentStage: {},
};

/* eslint-disable default-case, no-param-reassign */
const orderDetailPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default orderDetailPageReducer;
