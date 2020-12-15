/*
 *
 * ProfileInfoPage actions
 *
 */

import {
  LOAD_DATA_PROFILE,
  DEFAULT_ACTION,
  LOAD_EDITABLE_PROFILE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  LOAD_EDITED_PROFILE,
  CLOSE_DIALOG,
  CLOSE_DIALOG_GO_HOME,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadProfile() {
  return {
    type: LOAD_DATA_PROFILE,
  };
}
export function loadEditableProfile(profile) {
  return {
    type: LOAD_EDITABLE_PROFILE,
    profile,
  };
}
export function loadEditedProfile(editedProfile) {
  return {
    type: LOAD_EDITED_PROFILE,
    editedProfile,
  };
}
export function requestUpdateProfile(newProfile) {
  return {
    type: UPDATE_PROFILE,
    newProfile,
  };
}
export function updateProfileSuccess(response) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    response,
  };
}

export function updateProfileError(error) {
  return {
    type: UPDATE_PROFILE_ERROR,
    error,
  };
}
export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  };
}
export function closeAndGoHome() {
  return {
    type: CLOSE_DIALOG_GO_HOME,
  };
}
