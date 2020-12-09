/* eslint-disable no-console */
/*
 *
 * ProfileInfoPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, REQUEST_UPDATE_DATA_PROFILE } from './constants';

export const initialState = {
  customerName: 'Nguyen Van A',
  customerId: 'SGF123',
  companyName: 'Công ty TNHH MTV SGFintech',
  creditAmount: 50000000,
  idCard: '135792468',
  customerAddress: '22 xóm cây Dừa, Bình Dương',
  idCardIssueDate: '13/11/2009',
  idCardIssuePlace: 'CA Bình Dương',
  bankName: 'SCB',
  accountNumber: '13072320001',
  accountName: 'Nguyen Van A ',
  listImages: {},
};

/* eslint-disable default-case, no-param-reassign */
const profileInfoPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_UPDATE_DATA_PROFILE:
        console.log('REQUEST UPDATE');
        console.log('ACTION: ', action);
        draft.data = action.data;
        break;
    }
  });

export default profileInfoPageReducer;
