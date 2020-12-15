import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the documentPage state domain
 */

const selectDocumentPageDomain = state => state.documentPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DocumentPage
 */
const makeSelectDocuments = () =>
  createSelector(
    selectDocumentPageDomain,
    documentState => documentState.documents,
  );
const makeSelectDocumentPage = () =>
  createSelector(
    selectDocumentPageDomain,
    substate => substate,
  );

export default makeSelectDocumentPage;
export { selectDocumentPageDomain, makeSelectDocuments };
