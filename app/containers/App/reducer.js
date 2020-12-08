/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { ON_LOAD_APP } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  isAuthenticated: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // case LOAD_REPOS:
      //   draft.loading = true;
      //   draft.error = false;
      //   draft.userData.repositories = false;
      //   break;

      // case LOAD_REPOS_SUCCESS:
      //   draft.userData.repositories = action.repos;
      //   draft.loading = false;
      //   draft.currentUser = action.username;
      //   break;

      case ON_LOAD_APP:
        draft.loading = true;
        draft.error = false;
        break;
    }
  });

export default appReducer;
