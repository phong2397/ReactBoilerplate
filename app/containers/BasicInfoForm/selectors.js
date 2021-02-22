import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the basicInfoForm state domain
 */

const selectBasicInfoFormDomain = state => state.basicInfoForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BasicInfoForm
 */

const makeSelectBasicInfoForm = () =>
  createSelector(
    selectBasicInfoFormDomain,
    substate => substate,
  );
const makeSelectLocation = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.location,
  );
const makeSelectLoading = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.loading,
  );
const makeSelectBirthday = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.birthday,
  );
const makeSelectProvince = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.province,
  );
const makeSelectProvinceList = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.provinceList,
  );
const makeSelectDistrict = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.district,
  );
const makeSelectDistrictList = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.districtList,
  );
const makeSelectWard = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.ward,
  );
const makeSelectWardList = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.wardList,
  );
const makeSelectBasicInfo = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.basicInfo,
  );
const makeSelectRawData = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.rawData,
  );
const makeSelectSkip = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.skip,
  );
const makeSelectCompanyInfo = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.companyInfo,
  );
const makeSelectLoadState = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfoForm => basicInfoForm.loadingState,
  );
const makeSelectErrorResponse = () =>
  createSelector(
    selectBasicInfoFormDomain,
    basicInfo => basicInfo.errorResponse,
  );
export default makeSelectBasicInfoForm;
export {
  selectBasicInfoFormDomain,
  makeSelectCompanyInfo,
  makeSelectBirthday,
  makeSelectLocation,
  makeSelectLoading,
  makeSelectProvince,
  makeSelectProvinceList,
  makeSelectDistrict,
  makeSelectDistrictList,
  makeSelectWard,
  makeSelectWardList,
  makeSelectBasicInfo,
  makeSelectRawData,
  makeSelectSkip,
  makeSelectLoadState,
  makeSelectErrorResponse,
};
