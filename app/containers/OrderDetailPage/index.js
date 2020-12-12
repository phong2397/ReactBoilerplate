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
  makeSelectLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  // STATE_WAITING,
  STATE_SUCCESS,
  STATE_ERROR,
} from '../../utils/stateColorConst';

export function OrderDetailPage({
  loading,
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
    console.log('ORDER DETAIL LOADING', loading);
    if (loading) {
      loadOrderDetail();
    }
  });

  return (
    <div>
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
            <TimelineDot style={{ backgroundColor: `${STATE_SUCCESS}` }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <OrderAppraiseStatus
              stateColor={STATE_SUCCESS}
              statusTag={appraisalStage.status}
              resolveTime={appraisalStage.approveTime}
            />
          </TimelineContent>
        </TimelineItem>

        {/* Diabussement Status */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: `${STATE_SUCCESS}` }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <OrderDisbursementStatus
              stateColor={STATE_SUCCESS}
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
            <TimelineDot style={{ backgroundColor: `${STATE_ERROR}` }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <OrderRepaymentStatus
              stateColor={STATE_ERROR}
              statusTag={repaymentStage.status}
              repayTime={repaymentStage.repayTime}
            />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

OrderDetailPage.propTypes = {
  loading: PropTypes.bool,
  initStage: PropTypes.object,
  appraisalStage: PropTypes.object,
  disbursementStage: PropTypes.object,
  repaymentStage: PropTypes.object,
  loadOrderDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
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
