// import { push } from 'connected-react-router';
// import moment from 'moment';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import history from 'utils/history';
import { getAccessToken } from 'utils/storage';
import { formatDate } from 'utils/formater';

import {
  requestOrderListByPhoneSuccess,
  requestOrderListByPhoneFail,
} from './actions';
import { REQUEST_ORDER_LIST_BY_PHONE } from './constants';

export function* getOrderListSaga() {
  // const phone = getPhone();
  const accessToken = yield call(getAccessToken);
  const requestURL = `/customergateway/api/v2/orderrequest/phone?phone=${accessToken}`;
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
    const orderList = response.map(order => {
      const { createdDate } = order;
      const statusOrderTransfer = {
        wait: 'Đang chờ xét duyệt',
        wfs: 'Đang chờ giải ngân',
        act: 'Đã giải ngân',
        deni: 'Xét duyệt không thành công',
        done: 'Đã hoàn thành',
      };
      return {
        orderId: `${order.id}`,
        orderStatusCode: order.status,
        orderAmount: order.borrow,
        orderSubmitTime: formatDate(createdDate),
        orderFee: order.feeBorrow,
        orderRate: order.interestRate,
        orderTimeBorrow: order.timeBorrow,
        orderStatus: statusOrderTransfer[order.status],
        orderDesc: order.description,
      };
    });

    yield put(requestOrderListByPhoneSuccess({ orderList, response }));
  } catch (err) {
    if (err.message === '401') {
      yield call(history.push, '/logout');
    }
    yield put(requestOrderListByPhoneFail(err));
  }
}
// Individual exports for testing
export default function* historyPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_ORDER_LIST_BY_PHONE, getOrderListSaga);
}
