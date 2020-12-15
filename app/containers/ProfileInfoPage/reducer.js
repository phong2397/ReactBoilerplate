/* eslint-disable no-console */
/*
 *
 * ProfileInfoPage reducer
 *
 */
import produce from 'immer';
import {
  CLOSE_DIALOG,
  DEFAULT_ACTION,
  LOAD_EDITABLE_PROFILE,
  UPDATE_PROFILE_ERROR,
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
  open: false,
  notifyTitle: '',
  typeId: -1,
  messageContent: '',
};

/* eslint-disable default-case, no-param-reassign */
const profileInfoPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_EDITABLE_PROFILE:
        draft.loading = false;
        draft.editableProfile = action.profile;
        break;
      case UPDATE_PROFILE_SUCCESS:
        draft.open = true;
        draft.notifyTitle = 'Cập nhật thành công';
        draft.typeId = 1;
        draft.messageContent = 'Thông tin của bạn đã được cập nhật.';
        break;
      case UPDATE_PROFILE_ERROR:
        draft.open = true;
        draft.notifyTitle = 'Cập nhật thất bại';
        draft.typeId = 0;
        draft.messageContent = 'Vui lòng kiểm tra lại thông tin';
        break;
      case CLOSE_DIALOG:
        draft.open = false;
        break;
    }
  });

export default profileInfoPageReducer;
