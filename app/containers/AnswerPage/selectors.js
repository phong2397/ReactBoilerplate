import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the answerPage state domain
 */

const selectAnswerPageDomain = state => state.answerPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AnswerPage
 */

const makeSelectAnswerPage = () =>
  createSelector(
    selectAnswerPageDomain,
    substate => substate,
  );

export default makeSelectAnswerPage;
export { selectAnswerPageDomain };
