/*
 *
 * Main reducer
 *
 */
import produce from 'immer';
import { getPhone } from '../../utils/storage';
import { CHANGE_TAB, DEFAULT_ACTION, LOAD_PROFILE_SUCCESS } from './constants';

export const initialState = {
  value: 0,
  loading: true,
  phone: getPhone(),
  unCompleteProfile: true,
};

/* eslint-disable default-case, no-param-reassign */
const mainReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_TAB:
        draft.value = action.value;
        break;
      case LOAD_PROFILE_SUCCESS:
        draft.loading = false;
        break;
    }
  });

export default mainReducer;
