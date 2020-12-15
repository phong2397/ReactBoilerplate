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
  listOrders: [],
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
