/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { getProfile } from 'utils/storage';
import {
  CHANGE_ACTIVE_STEP,
  CHANGE_PROFILE_NAME,
  DEFAULT_ACTION,
} from './constants';

export const initialState = {
  activeStep: 0,
  profileName: getProfile() ? getProfile().fullname : '',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_ACTIVE_STEP:
        draft.activeStep = action.step;
        break;
      case CHANGE_PROFILE_NAME:
        draft.profileName = action.name;
    }
  });

export default homePageReducer;
