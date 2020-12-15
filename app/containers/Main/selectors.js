import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the main state domain
 */

const selectMainDomain = state => state.main || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Main
 */

const makeSelectMain = () =>
  createSelector(
    selectMainDomain,
    substate => substate,
  );
const makeSelectValue = () =>
  createSelector(
    selectMainDomain,
    mainState => mainState.value,
  );
const makeSelectLoading = () =>
  createSelector(
    selectMainDomain,
    mainState => mainState.loading,
  );
const makeSelectCurrentPhone = () =>
  createSelector(
    selectMainDomain,
    mainState => mainState.phone,
  );
export default makeSelectMain;
export {
  makeSelectCurrentPhone,
  selectMainDomain,
  makeSelectValue,
  makeSelectLoading,
};
