import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the documentForm state domain
 */

const selectDocumentFormDomain = state => state.documentForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DocumentForm
 */

const makeSelectDocumentForm = () =>
  createSelector(
    selectDocumentFormDomain,
    substate => substate,
  );

const makeSelectDocument = () =>
  createSelector(
    selectDocumentFormDomain,
    substate => substate.documents,
  );

const makeSelectError = () =>
  createSelector(
    selectDocumentFormDomain,
    substate => substate.noticeError,
  );

const makeSelectLoading = () =>
  createSelector(
    selectDocumentFormDomain,
    substate => substate.loading,
  );

export default makeSelectDocumentForm;
export {
  selectDocumentFormDomain,
  makeSelectError,
  makeSelectDocument,
  makeSelectLoading,
};
