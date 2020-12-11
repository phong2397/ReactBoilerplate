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
  productConfig: {
    productCode: '',
    productName: '',
    productStatus: 0,
    productAmountMax: 0,
    productAmountMin: 0,
    productFee: 0,
    productRate: 0,
  },
  selectedAmount: 0,
  step: 100000,
  rate: 0,
  defaultAmount: 0,
  feeAmount: 0,
  // bankName: 'SCB',
  // accNo: '100100132448',
  // accName: 'Nguyen Van A',
  phone: '0987654321',
  // companyCode: 'SGFintech',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_PRODUCT_SUCCESS:
        console.log(action);
        draft.loading = false;
        draft.productConfig = action.config;
        draft.defaultAmount = draft.productConfig.productAmountMax;
        draft.selectedAmount = draft.productConfig.productAmountMax;
        draft.feeAmount = Number(
          (
            (draft.productConfig.productAmountMax *
              draft.productConfig.productRate) /
            100
          ).toFixed(0),
        );
        break;
      case CHANGE_SELECTED_AMOUNT:
        draft.feeAmount = Number(
          ((action.value * draft.productConfig.productRate) / 100).toFixed(0),
        );
        draft.selectedAmount = action.value;
        break;
    }
  });

export default homePageReducer;
