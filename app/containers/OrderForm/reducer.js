/*
 *
 * OrderForm reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_VALUE,
  LOAD_PRODUCT_ERROR,
  LOAD_PRODUCT_SUCCESS,
} from './constants';

export const initialState = {
  value: 0,
  min: 0,
  max: 0,
  rate: 0,
  disbursedAmount: 0,
  maxAdvance: 0,
  defaultValue: 0,
  canSlide: true,
  showMark: false,
  advanceCount: 0,
  rateAdvance: 0,
  noticeError: '',
};

/* eslint-disable default-case, no-param-reassign */
const orderFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_VALUE:
        draft.value = action.value;
        break;
      case LOAD_PRODUCT_ERROR:
        draft.canSlide = false;
        if (action.error) {
          // ERROR CODE: {responseCode: '101', description: 'REQUEST SEND HAS MUCH'}
          if (action.error.responseCode === '101')
            draft.noticeError =
              'Bạn đã yêu cầu nhiều hơn số đơn tối đa trong kì lương này';
          if (!action.error.responseCode) {
            const errorCode = action.error
              .toString()
              .split(':')[1]
              .trim();
            if (errorCode === '500')
              draft.noticeError = '500: Đã có lỗi từ máy chủ.';
          }
        } else {
          draft.noticeError = 'Đã có lỗi xảy ra';
        }
        break;
      case LOAD_PRODUCT_SUCCESS:
        draft.max = Number(action.config.productAmountMax);
        draft.min = Number(action.config.productAmountMin);
        draft.rate = Number(action.config.productRate);
        draft.advanceCount = Number(action.config.advanceCount);
        draft.disbursedAmount = Number(action.config.disbursedAmount);
        draft.maxAdvance = action.config.maxAdvance;
        draft.rateAdvance = action.config.rateAdvance;
        if (draft.maxAdvance < draft.min) {
          draft.canSlide = false;
          draft.noticeError = 'Bạn chưa đủ điều kiện để gửi yêu cầu ứng lương';
        } else {
          draft.canSlide = true;
        }
        draft.showMark = true;
        break;
    }
  });

export default orderFormReducer;
