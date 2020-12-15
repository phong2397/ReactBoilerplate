import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );
const makeSelectLoading = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.loading,
  );
const makeSelectProductConfig = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.productConfig,
  );
const makeSelectAmount = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.selectedAmount,
  );
const makeSelectStep = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.step,
  );

const makeSelectDefaultAmount = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.defaultAmount,
  );

const makeSelectFeeAmount = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.feeAmount,
  );
const makeSelectRate = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.rate,
  );
const makeSelectOpenDialog = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.openDialog,
  );
export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectLoading,
  makeSelectProductConfig,
  makeSelectAmount,
  makeSelectStep,
  makeSelectDefaultAmount,
  makeSelectFeeAmount,
  makeSelectRate,
  makeSelectOpenDialog,
};
