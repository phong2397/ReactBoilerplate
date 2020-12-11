/* eslint-disable no-console */
/*
 *
 * ProfileInfoPage reducer
 *
 */
import produce from 'immer';
import { parseDateString } from '../../utils/formater';
import { DEFAULT_ACTION, LOAD_DATA_PROFILE_SUCCESS } from './constants';

export const initialState = {
  loading: true,
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
};

/* eslint-disable default-case, no-param-reassign */
const profileInfoPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log(action);
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_DATA_PROFILE_SUCCESS:
        draft.loading = false;
        draft.customerName = action.response.customer_name;
        draft.customerId = action.response.customer_code;
        draft.companyName = action.response.company_name;
        draft.creditAmount = action.response.customer_salary;
        draft.idCard = action.response.customer_id;
        draft.customerAddress = action.response.customer_address;
        draft.idCardIssueDate = parseDateString(
          action.response.customer_id_date,
        );
        draft.idCardIssuePlace = action.response.customer_id_location;
        draft.bankName = action.response.customer_bank_name;
        draft.accountNumber = action.response.customer_bank_acc;
        draft.accountName = action.response.customer_bank;
        break;
    }
  });

export default profileInfoPageReducer;
