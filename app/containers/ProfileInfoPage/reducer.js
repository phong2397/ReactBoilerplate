/* eslint-disable no-console */
/*
 *
 * ProfileInfoPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOAD_DATA_PROFILE_SUCCESS } from './constants';

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
        draft.customer = {
          customerName: action.customer.customer_name,
          customerId: action.customer.customer_code,
          companyName: action.customer.company_name,
          creditAmount: action.customer.customer_salary,
          idCard: action.customer.customer_id,
          customerAddress: action.customer.customer_address,
          idCardIssueDate: action.customer.customer_id_date,
          idCardIssuePlace: action.customer.customer_id_location,
          bankName: action.customer.customer_bank_name,
          accountNumber: action.customer.customer_bank_acc,
          accountName: action.customer.customer_bank,
        };
        break;
    }
  });

export default profileInfoPageReducer;
