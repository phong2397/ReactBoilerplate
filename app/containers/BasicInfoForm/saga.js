import history from 'utils/history';
import moment from 'moment';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { v4 as uuidv4 } from 'uuid';
import {
  getAccessToken,
  saveProfile,
  getCompanyId,
  setCompanyInfo,
} from 'utils/storage';
import {
  requestLoadCompany,
  requestLoadLocation,
  getBasicInfo,
  getBasicInfoFail,
  getBasicInfoSuccess,
  loadCompanyInfoError,
  loadedCompanyInfo,
  loadedLocation,
  loadLocationErrror,
  updateFail,
  updateSuccess,
  loadingAction,
  loadStateAction,
} from './actions';
import {
  REQUEST_BASIC_INFO,
  REQUEST_COMPANY,
  REQUEST_LOAD_LOCATION,
  UPDATE_BASIC_INFO,
  LOAD_BASIC_INFO,
} from './constants';
import { makeSelectLoadState, makeSelectRawData } from './selectors';
import { changeProfileName } from '../HomePage/actions';
function getAddressObject(address) {
  const addressArray = address.split(',');
  const addressDescription = addressArray
    .slice(0, addressArray.length - 3)
    .join()
    .trim();
  if (addressArray.length < 2)
    return {
      province: null,
      district: null,
      ward: null,
      description: address,
    };
  const addressProvince = addressArray[addressArray.length - 1].trim();
  const addressDistrict = addressArray[addressArray.length - 2].trim();
  const addressWard = addressArray[addressArray.length - 3].trim();
  return {
    province: {
      name: addressProvince,
    },
    district: {
      name: addressDistrict,
    },
    ward: {
      name: addressWard,
    },
    description: addressDescription,
  };
}
function parseAddressObject(address) {
  return `${address.description}, ${address.ward.name}, ${
    address.district.name
  }, ${address.province.name}`;
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function* getBasicInfoSaga() {
  // const phone = getPhone();
  const accessToken = yield call(getAccessToken);
  const requestURL = `/customergateway/api/v2/customer/find?phone=${accessToken}`;
  const parameters = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    const rawData = response;
    const basicInfo = {
      accName: response.customerBank,
      accNo: response.customerBankAcc,
      bankName: response.customerBankName,
      birthday: moment(response.customerBirthday, 'YYYY-MM-DD').format(
        'DD/MM/YYYY',
      ),
      address: getAddressObject(response.customerAddress),
      addressTemp: getAddressObject(response.customerAddressTemp),
      fullname: response.customerName,
      gender: response.customerGender,
      identity: response.customerId,
      identityDate: moment(response.customerIdDate, 'YYYY-MM-DD').format(
        'DD/MM/YYYY',
      ),
      identityLocation: response.customerIdLocation,
      job: response.customerPosition,
      phone: response.customerPhone,
      salaryPermonth: `${numberWithCommas(response.customerSalary)}đ`,
      email: response.customerEmail,
      customerCode: response.customerCode,
      contract: response.customerContract.toString(),
    };
    yield call(saveProfile, basicInfo);
    yield put(getBasicInfoSuccess({ basicInfo, rawData }));
  } catch (err) {
    if (err.message === '401') {
      yield call(history.push, '/logout');
    }
    yield put(getBasicInfoFail(err));
  }
  const loadState = yield select(makeSelectLoadState());
  yield put(loadStateAction({ ...loadState, basicInfo: true }));
}
export function* updateBasicInfo({ basicInfo }) {
  const {
    accName,
    accNo,
    address,
    addressTemp,
    bankName,
    birthday,
    fullname,
    gender,
    identity,
    job,
    phone,
    salaryPermonth,
    email,
    identityDate,
    identityLocation,
    contract,
    customerCode,
  } = basicInfo;
  const requestURL = `/customergateway/api/v1/`;
  const rawData = yield select(makeSelectRawData());
  const parameters = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
    body: JSON.stringify({
      RequestDateTime: `${moment().format('YYYYMMDDhhmms')}`,
      RequestID: `${uuidv4()}`,
      FunctionName: 'UPDATEPROFILE',
      Data: {
        ...rawData,
        customerBank: accName,
        customerBankAcc: accNo,
        customerBankName: bankName,
        // eslint-disable-next-line object-shorthand
        customerEmail: email,
        customerId: identity,
        customerIdDate: moment(identityDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        customerIdLocation: identityLocation,
        customerName: fullname,
        customerPhone: phone,
        customerPosition: job,
        customerSalary: Number(
          salaryPermonth.replace(/,/g, '').replace('đ', ''),
        ),
        customerBirthday: moment(birthday, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        customerGender: gender,
        customerAddress: parseAddressObject(address),
        customerAddressTemp: parseAddressObject(addressTemp),
        customerContract: Number(contract),
        customerCode,
      },
    }),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    if (response.ResponseCode === '000') {
      yield put(updateSuccess(response));
      yield call(saveProfile, basicInfo);
      // Update if profile name change
      yield put(changeProfileName(basicInfo ? basicInfo.fullname : ''));
      yield call(history.push, '/yeucau/tai-lieu');
    } else yield put(updateFail(response));
  } catch (err) {
    yield put(updateFail(err));
  }
}
export function* loadCompanySaga() {
  const companyId = yield call(getCompanyId);
  const requestURL = `/customergateway/api/v1/company/find?code=${companyId}`;
  const parameters = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    if (response.length !== 0) {
      yield put(loadedCompanyInfo(response[0]));
      yield call(setCompanyInfo(response[0]));
    }
  } catch (err) {
    yield put(loadCompanyInfoError(err));
  }
  const loadState = yield select(makeSelectLoadState());
  yield put(loadStateAction({ ...loadState, company: true }));
}
export function* loadLocationSaga() {
  const requestURL = `/customergateway/api/v1/location`;
  const parameters = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': 'Basic c2dmaW50ZWNoOms2bXpNdFBKTFBNaTVjckY='
    }),
  };
  try {
    const response = yield call(request, requestURL, parameters);
    yield put(loadedLocation(response));
  } catch (err) {
    yield put(loadLocationErrror(err));
  }
  const loadState = yield select(makeSelectLoadState());
  yield put(loadStateAction({ ...loadState, location: true }));
}
export function* loadBasicInfoSaga() {
  yield put(loadingAction(true));
  yield all([
    put(requestLoadCompany()),
    put(requestLoadLocation()),
    put(getBasicInfo()),
  ]);
}
// Individual exports for testing
export default function* basicInfoFormSaga() {
  yield takeLatest(LOAD_BASIC_INFO, loadBasicInfoSaga);
  yield takeLatest(UPDATE_BASIC_INFO, updateBasicInfo);
  yield takeLatest(REQUEST_LOAD_LOCATION, loadLocationSaga);
  yield takeLatest(REQUEST_BASIC_INFO, getBasicInfoSaga);
  yield takeLatest(REQUEST_COMPANY, loadCompanySaga);
}
