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
import makeSelectOrderDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function OrderDetailPage({
  initStatus,
  orderId,
  orderAmount,
  requestTime,
  approveStatus,
  approveTime,
  disburseStatus,
  disburseTime,
  disburseLabel,
  accountNo,
  accountName,
  bankName,
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
              statusTag={initStatus}
              orderId={orderId}
              amount={orderAmount}
              requestTime={requestTime}
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
              statusTag={approveStatus}
              resolveTime={approveTime}
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
              statusTag={disburseStatus}
              disburseTime={disburseTime}
              label={disburseLabel}
              accName={accountName}
              accNo={accountNo}
              bankName={bankName}
            />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

OrderDetailPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  initStatus: PropTypes.string,
  orderId: PropTypes.string,
  orderAmount: PropTypes.number,
  requestTime: PropTypes.string,
  approveStatus: PropTypes.string,
  approveTime: PropTypes.string,
  disburseStatus: PropTypes.string,
  disburseTime: PropTypes.string,
  accountNo: PropTypes.string,
  accountName: PropTypes.string,
  bankName: PropTypes.string,
  disburseLabel: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  orderDetailPage: makeSelectOrderDetailPage(),
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
