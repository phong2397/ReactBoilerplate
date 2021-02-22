/*
 *
 * BasicInfoForm reducer
 *
 */
import produce from 'immer';
import 'date-fns';
import {
  CHANGE_BIRTHDAY,
  DEFAULT_ACTION,
  LOADING_DATA,
  LOADING_STATE,
  LOAD_LOCATION_SUCCESS,
  REQUEST_BASIC_INFO_SUCCESS,
  REQUEST_COMPANY_SUCCESS,
  REQUEST_SKIP,
  UPDATE_BASIC_INFO_FAIL,
  UPDATE_BASIC_INFO_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  birthday: new Date(),
  location: [],
  rawData: null,
  skip: false,
  basicInfo: null,
  companyInfo: null,
  loadingState: {
    company: false,
    location: false,
    basicInfo: false,
  },
  errorResponse: null,
};
/* eslint-disable default-case, no-param-reassign */
const basicInfoFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_BIRTHDAY:
        draft.birthday = action.birthday;
        break;
      case LOADING_STATE:
        draft.loadingState = action.loadingState;
        break;
      case LOADING_DATA:
        draft.loading = action.loading;
        break;
      case LOAD_LOCATION_SUCCESS:
        draft.location = action.location;
        break;
      case REQUEST_BASIC_INFO_SUCCESS:
        draft.basicInfo = action.data.basicInfo;
        draft.rawData = action.data.rawData;
        break;
      case REQUEST_COMPANY_SUCCESS:
        draft.companyInfo = action.response;
        break;
      case UPDATE_BASIC_INFO_FAIL:
        draft.errorResponse = action.errors;
        break;
      case UPDATE_BASIC_INFO_SUCCESS:
        draft.errorResponse = null;
        break;
      case REQUEST_SKIP:
        draft.skip = true;
        break;
    }
  });

export default basicInfoFormReducer;
