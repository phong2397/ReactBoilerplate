/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOAD_PROFILE_SUCCESS } from './constants';

export const initialState = {
  name: '',
  code: '',
  salary: 0,
  bank: '',
  bankNo: '',
  bankName: '',
  address: '',
  addressWork: '',
  id: '',
  idLocation: '',
  idDate: '',
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_PROFILE_SUCCESS:
        draft.name = action.name;
        draft.code = action.code;
        draft.salary = action.salary;
        draft.bank = action.bank;
        draft.bankNo = action.bankNo;
        draft.bankName = action.bankName;
        draft.address = action.address;
        draft.addressWork = action.addressWork;
        draft.id = action.id;
        draft.idLocation = action.idLocation;
        draft.idDate = action.idDate;
        break;
    }
  });

export default profilePageReducer;
