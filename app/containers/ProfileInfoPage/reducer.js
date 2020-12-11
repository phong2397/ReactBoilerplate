/* eslint-disable no-console */
/*
 *
 * ProfileInfoPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_EDITABLE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
} from './constants';

export const initialState = {
  loading: true,
  customer: {
    customerName: '',
    customerId: '',
    companyName: '',
    creditAmount: 0,
    idCard: '',
    customerAddress: '',
    idCardIssueDate: '',
    idCardIssuePlace: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
    listImages: '',
  },
  editableProfile: {},
};

/* eslint-disable default-case, no-param-reassign */
const profileInfoPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log(state);
    console.log(action);
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_EDITABLE_PROFILE:
        draft.loading = false;
        draft.editableProfile = action.profile;
        break;
      case UPDATE_PROFILE_SUCCESS:
        draft.editableProfile = action.newProfile;
    }
  });

export default profileInfoPageReducer;
