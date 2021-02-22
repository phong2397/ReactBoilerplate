import moment from 'moment';
import history from 'utils/history';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { saveProfile, getAccessToken } from 'utils/storage';
import { LOAD_BASIC_INFO } from './constants';
import { changeProfileName } from './actions';
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
    const basicInfo = {
      accName: response.customerBankName,
      accNo: response.customerBankAcc,
      bankName: response.customerBank,
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
      salaryPermonth: response.customerSalary,
      email: response.customerEmail,
      customerCode: response.customerCode,
      contract: response.customerContract.toString(),
    };
    yield call(saveProfile, basicInfo);
    yield put(changeProfileName(basicInfo ? basicInfo.fullname : ''));
  } catch (err) {
    yield put(history.push('/logout'));
  }
}
// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(LOAD_BASIC_INFO, getBasicInfoSaga);
}
