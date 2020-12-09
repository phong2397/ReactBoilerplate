import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the subContent state domain
 */

const selectSubContentDomain = state => state.subContent || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SubContent
 */

const makeSelectSubContent = () =>
  createSelector(
    selectSubContentDomain,
    substate => substate,
  );

export default makeSelectSubContent;
export { selectSubContentDomain };
