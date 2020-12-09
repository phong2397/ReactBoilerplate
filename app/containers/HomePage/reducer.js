/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { CHANGE_SELECTED_AMOUNT, DEFAULT_ACTION } from './constants';

export const initialState = {
  creditAmount: 3000000,
  selectedAmount: 1500000,
  step: 100000,
  rate: 0.014,
  defaultAmount: 1500000,
  feeAmount: 150000,
  bankName: 'SCB',
  accNo: '0000 1234 5678 0112',
  accName: 'Nguyen Van A',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_SELECTED_AMOUNT:
        draft.feeAmount = action.value * draft.rate;
        draft.selectedAmount = action.value;
    }
  });

export default homePageReducer;
