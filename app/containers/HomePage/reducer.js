/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  ALERT_EMPTY_PROFILE,
  CHANGE_SELECTED_AMOUNT,
  CLOSE_DIALOG,
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
  openDialog: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.productConfig = action.config;
        draft.defaultAmount = Number(draft.productConfig.productAmountMax);
        draft.selectedAmount = Number(draft.productConfig.productAmountMax);
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
      case ALERT_EMPTY_PROFILE:
        draft.openDialog = true;
        break;
      case CLOSE_DIALOG:
        draft.openDialog = false;
        break;
    }
  });

export default homePageReducer;
