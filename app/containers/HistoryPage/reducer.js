/*
 *
 * HistoryPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOAD_ORDERS_SUCCESS } from './constants';
import { formatListOrders } from './formater';

export const initialState = {
  loading: true,
  listOrders: [
    {
      orderId: '0010',
      orderStatus: 'Đang chờ giải ngân',
      orderAmount: '5000000',
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
};

/* eslint-disable default-case, no-param-reassign */
const historyPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_ORDERS_SUCCESS:
        console.log('REDUCER ACTION: ', action);
        draft.loading = false;
        draft.listOrders = formatListOrders(action.value);
        console.log('DRAFT: ', draft);
        break;
    }
  });

export default historyPageReducer;
