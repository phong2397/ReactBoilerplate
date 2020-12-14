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
const makeSelectLoadingDocument = () =>
  createSelector(
    selectDocumentPageDomain,
    documentState => documentState.loading,
  );
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
const makeSelectOpenFormUpload = () =>
  createSelector(
    selectDocumentPageDomain,
    documentState => documentState.openForm,
  );
const makeSelectFileDocument = () =>
  createSelector(
    selectDocumentPageDomain,
    documentState => documentState.file,
  );
const makeSelectDescription = () =>
  createSelector(
    selectDocumentPageDomain,
    documentState => documentState.description,
  );
const makeSelectFilter = () =>
  createSelector(
    selectDocumentPageDomain,
    documentState => documentState.filter,
  );
export default makeSelectDocumentPage;
export {
  selectDocumentPageDomain,
  makeSelectLoadingDocument,
  makeSelectDocuments,
  makeSelectOpenFormUpload,
  makeSelectFileDocument,
  makeSelectDescription,
  makeSelectFilter,
};
