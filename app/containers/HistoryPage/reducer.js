/*
 *
 * HistoryPage reducer
 *
 */
import produce from 'immer';
import { setCountBorrowInMonth } from 'utils/storage';
import {
  DEFAULT_ACTION,
  REQUEST_ORDER_LIST_BY_PHONE_SUCCESS,
  REQUEST_ORDER_LIST_BY_PHONE_FAIL,
} from './constants';

export const initialState = {
  orderList: [],
  firstLoad: true,
  listBorrowInMonth: [],
};

/* eslint-disable default-case, no-param-reassign */
const historyPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_ORDER_LIST_BY_PHONE_SUCCESS:
        draft.firstLoad = false;
        draft.orderList = action.data.orderList;
        // console.log('REDUCER history: ', action.data.orderList);
        // TODO: check in same month
        draft.listBorrowInMonth = action.data.orderList.filter(order => {
          const listAccept = ['act', 'done'];
          return listAccept.includes(order.orderStatusCode);
        });
        setCountBorrowInMonth(draft.listBorrowInMonth.length);
        break;
      case REQUEST_ORDER_LIST_BY_PHONE_FAIL:
        break;
    }
  });

export default historyPageReducer;
