/**
 *
 * OrderDetailPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Timeline, TimelineItem, TimelineConnector, TimelineContent, TimelineDot, TimelineSeparator } from "@material-ui/lab";
import OrderInitStatus from "components/OrderInitStatus";
import OrderAppraiseStatus from "components/OrderAppraiseStatus";
import OrderDisbursementStatus from "components/OrderDisbursementStatus";
import makeSelectOrderDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function OrderDetailPage() {
  useInjectReducer({ key: 'orderDetailPage', reducer });
  useInjectSaga({ key: 'orderDetailPage', saga });

  return (
    <div>
      <Timeline>
        {/* Init status*/}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: '#33cc33' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <OrderInitStatus
              statusTag="Khởi tạo"
              orderId="#0012"
              amount="1,000,000đ"
              requestTime="02/12/2020"
            />
          </TimelineContent>
        </TimelineItem>
        
        {/* Approve status*/}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: '#33cc33' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <OrderAppraiseStatus
              statusTag="Yêu cầu được chấp nhận"
              resolveTime="20/11/2020 11h30"
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
              statusTag="Đơn giải ngân"
              label=""
              accName="BUI LE HUYNH"
              accNo="13079390001"
              bankName="SCB - Ngân hàng thương mại cổ phần Sài Gòn"
            />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

OrderDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
