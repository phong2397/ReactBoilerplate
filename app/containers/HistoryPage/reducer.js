/*
 *
 * HistoryPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  listOrders: [
    {
      orderId: '0010',
      orderStatus: 'Đang chờ giải ngân',
      orderAmount: 5000000,
      submitTime: '31/11/2012 14h56',
    },
    {
      orderId: '0011',
      orderStatus: 'Đang chờ giải ngân',
      orderAmount: '4000000',
      submitTime: '01/12/2012 14h56',
    },
    {
      orderId: '0012',
      orderStatus: 'Đang chờ giải ngân',
      orderAmount: '6000000',
      submitTime: '04/12/2012 16h56',
    },
  ],
  user: `AAAAAAAAA`,
};

/* eslint-disable default-case, no-param-reassign */
const historyPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default historyPageReducer;
