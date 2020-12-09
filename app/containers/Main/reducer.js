/*
 *
 * Main reducer
 *
 */
import produce from 'immer';
import { CHANGE_TAB, DEFAULT_ACTION } from './constants';

export const initialState = {
  value: 0,
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
    }
  });

export default mainReducer;
