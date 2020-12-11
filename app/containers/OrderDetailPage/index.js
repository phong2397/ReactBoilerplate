/**
 *
 * OrderDetailPage
 *
 */

import React, { memo } from 'react';
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
import makeSelectOrderDetailPage, {
  makeSelectOrderInitStage,
  makeSelectOrderAppraisalStage,
  makeSelectOrderDisbursementStage,
  makeSelectOrderRepaymentStage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function OrderDetailPage({
  initStage,
  appraisalStage,
  disbursementStage,
  repaymentStage,
}) {
  useInjectReducer({ key: 'orderDetailPage', reducer });
  useInjectSaga({ key: 'orderDetailPage', saga });

  return (
    <div>
      <Timeline>
        {/* Init status */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: '#33cc33' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <OrderInitStatus
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
            <TimelineDot style={{ backgroundColor: '#33cc33' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <OrderAppraiseStatus
              statusTag={appraisalStage.status}
              resolveTime={appraisalStage.approveTime}
            />
          </TimelineContent>
        </TimelineItem>

        {/* Diabussement Status */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <OrderDisbursementStatus
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
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <OrderRepaymentStatus
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
  // dispatch: PropTypes.func.isRequired,
  initStage: PropTypes.object,
  appraisalStage: PropTypes.object,
  disbursementStage: PropTypes.object,
  repaymentStage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  orderDetailPage: makeSelectOrderDetailPage(),
  initStage: makeSelectOrderInitStage(),
  appraisalStage: makeSelectOrderAppraisalStage(),
  disbursementStage: makeSelectOrderDisbursementStage(),
  repaymentStage: makeSelectOrderRepaymentStage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrderDetailPage);
