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
export default makeSelectMain;
export { selectMainDomain, makeSelectValue };
