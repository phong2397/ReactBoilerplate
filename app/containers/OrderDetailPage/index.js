/**
 *
 * OrderDetailPage
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
} from '@material-ui/lab';
import { Box } from '@material-ui/core';

import OrderInitStatus from 'components/OrderInitStatus';
import OrderAppraiseStatus from 'components/OrderAppraiseStatus';
import OrderDisbursementStatus from 'components/OrderDisbursementStatus';
import OrderRepaymentStatus from 'components/OrderRepaymentStatus';

import { loadingOrderDetail } from './actions';
import makeSelectOrderDetailPage, {
  makeSelectOrderInitStage,
  makeSelectOrderAppraisalStage,
  makeSelectOrderDisbursementStage,
  makeSelectOrderRepaymentStage,
  makeSelectOrderId,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  STATE_NONE,
  STATE_WAITING,
  STATE_SUCCESS,
  STATE_ERROR,
} from '../../utils/stateColorConst';

import SubContent from '../SubContent/Loadable';

export function OrderDetailPage({
  orderId,
  initStage,
  appraisalStage,
  disbursementStage,
  repaymentStage,
  loadOrderDetail,
}) {
  useInjectReducer({ key: 'orderDetailPage', reducer });
  useInjectSaga({ key: 'orderDetailPage', saga });

  console.log('ORDER DETAIL 0');

  useEffect(() => {
    console.log('ORDER ID is ', orderId);
    const splitedUrl = window.location.href.split('/');
    const orderIdParams = splitedUrl[splitedUrl.length - 1];

    // TODO: MUST refactor condition load data, IT'S WRONG
    if (orderId !== orderIdParams) {
      loadOrderDetail();
    }
  });

  let appraisalStageColor;
  switch (appraisalStage.status) {
    case `WAITING`:
      appraisalStageColor = STATE_WAITING;
      break;
    case `PASS`:
      appraisalStageColor = STATE_SUCCESS;
      break;
    case `DENI`:
      appraisalStageColor = STATE_ERROR;
      break;
    default:
      appraisalStageColor = STATE_NONE;
      break;
  }

  let disbursementStageColor;
  switch (disbursementStage.status) {
    case `WAITING`:
      disbursementStageColor = STATE_WAITING;
      break;
    case `SUCCESS`:
      disbursementStageColor = STATE_SUCCESS;
      break;
    case `ERROR`:
      disbursementStageColor = STATE_ERROR;
      break;
    default:
      disbursementStageColor = STATE_NONE;
      break;
  }

  let repaymentStageColor;
  switch (repaymentStage.status) {
    case `WAITING`:
      repaymentStageColor = STATE_WAITING;
      break;
    case `SUCCESS`:
      repaymentStageColor = STATE_SUCCESS;
      break;
    case `ERROR`:
      repaymentStageColor = STATE_ERROR;
      break;
    default:
      repaymentStageColor = STATE_NONE;
      break;
  }

  return (
    <SubContent title="Chi Tiết Giao Dịch">
      <Box mt={12}>
        <Timeline>
          {/* Init status */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot style={{ backgroundColor: `${STATE_SUCCESS}` }} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <OrderInitStatus
                stateColor={STATE_SUCCESS}
                statusTag={initStage.status}
                orderId={initStage.orderId}
                amount={initStage.orderAmount}
                requestTime={initStage.submitTime}
              />
            </TimelineContent>
          </TimelineItem>

          {/* Approve status */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                style={{ backgroundColor: `${appraisalStageColor}` }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <OrderAppraiseStatus
                statusTag={appraisalStage.status}
                resolveTime={appraisalStage.approveTime}
                stateColor={appraisalStageColor}
              />
            </TimelineContent>
          </TimelineItem>

          {/* Diabussement Status */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                style={{ backgroundColor: `${disbursementStageColor}` }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <OrderDisbursementStatus
                stateColor={disbursementStageColor}
                statusTag={disbursementStage.status}
                disburseTime={disbursementStage.disburseTime}
                label={disbursementStage.disburseLabel}
                accName={disbursementStage.accountName}
                accNo={disbursementStage.accountNo}
                bankName={disbursementStage.bankName}
              />
            </TimelineContent>
          </TimelineItem>

          {/* Repayment Status */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                style={{ backgroundColor: `${repaymentStageColor}` }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <OrderRepaymentStatus
                stateColor={repaymentStageColor}
                statusTag={repaymentStage.status}
                repayTime={repaymentStage.repayTime}
              />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </SubContent>
  );
}

OrderDetailPage.propTypes = {
  orderId: PropTypes.string,
  initStage: PropTypes.object,
  appraisalStage: PropTypes.object,
  disbursementStage: PropTypes.object,
  repaymentStage: PropTypes.object,
  loadOrderDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  orderId: makeSelectOrderId(),
  orderDetailPage: makeSelectOrderDetailPage(),
  initStage: makeSelectOrderInitStage(),
  appraisalStage: makeSelectOrderAppraisalStage(),
  disbursementStage: makeSelectOrderDisbursementStage(),
  repaymentStage: makeSelectOrderRepaymentStage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadOrderDetail: () => dispatch(loadingOrderDetail()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrderDetailPage);
