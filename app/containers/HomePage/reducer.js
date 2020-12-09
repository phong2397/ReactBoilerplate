/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_SELECTED_AMOUNT,
  DEFAULT_ACTION,
  LOAD_PRODUCT_SUCCESS,
} from './constants';

export const initialState = {
  creditAmount: 0,
  selectedAmount: 0,
  step: 100000,
  rate: 0.014,
  defaultAmount: 0,
  feeAmount: 0,
  bankName: 'SCB',
  accNo: '0000 1234 5678 0112',
  accName: 'Nguyen Van A',
  phone: '0987654321',
  companyCode: 'SGFintech',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_PRODUCT_SUCCESS:
        draft.creditAmount = action.config.productAmountMax;
        draft.rate = action.config.productRate;
        draft.defaultAmount = action.config.productAmountMax;
        draft.selectedAmount = action.config.productAmountMax;
        draft.feeAmount = Number(
          ((action.config.productAmountMax * draft.rate) / 100).toFixed(0),
        );
        break;
      case CHANGE_SELECTED_AMOUNT:
        draft.feeAmount = Number(
          ((action.value * draft.rate) / 100).toFixed(0),
        );
        draft.selectedAmount = action.value;
    }
  });

export default homePageReducer;
