/**
 *
 * OrderInitStatus
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function initStatus(orderId, amount, requestTime) {
  return (
    <div>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          Mã đơn yêu cầu
        </Box>
        <Box p={1}>
          <b>{orderId}</b>
        </Box>
      </Box>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          Số tiền
        </Box>
        <Box p={1}>
          <b>{amount}</b>
        </Box>
      </Box>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          Gửi lúc
        </Box>
        <Box p={1}>
          <b>{requestTime}</b>
        </Box>
      </Box>
    </div>
  );
}

function OrderInitStatus(props) {
  return (
    <div>
      <Box
        component="div"
        p={1}
        display="inline"
        bgcolor="primary.main"
        color="primary.contrastText"
      >
        {props.statusTag}
      </Box>{' '}
      {/* statusTag: Tag trạng thái của log */}
      <Box component="div" bgcolor="info.main">
        {initStatus(props.orderId, props.amount, props.requestTime)}
      </Box>
    </div>
  );
}

OrderInitStatus.propTypes = {
  orderId: PropTypes.string,
  amount: PropTypes.number,
  requestTime: PropTypes.string,
  statusTag: PropTypes.string,
};

export default memo(OrderInitStatus);
