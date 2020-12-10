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
  loading: true,
  creditAmount: 0,
  selectedAmount: 0,
  step: 100000,
  rate: 0,
  defaultAmount: 0,
  feeAmount: 0,
  bankName: 'SCB',
  accNo: '100100132448',
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
        draft.loading = false;
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
        break;
    }
  });

export default homePageReducer;
