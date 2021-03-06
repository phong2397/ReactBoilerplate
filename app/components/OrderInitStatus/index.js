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
      <Box display="flex">
        <Box paddingTop={1} paddingLeft={2} flexGrow={1}>
          Mã đơn yêu cầu
        </Box>
        <Box paddingTop={1} paddingRight={2}>
          <b>{orderId}</b>
        </Box>
      </Box>
      <Box display="flex">
        <Box paddingTop={1} paddingLeft={2} flexGrow={1}>
          Số tiền
        </Box>
        <Box paddingTop={1} paddingRight={2}>
          <b>{amount}</b>
        </Box>
      </Box>
      <Box display="flex">
        <Box paddingTop={1} paddingBottom={1} paddingLeft={2} flexGrow={1}>
          Gửi lúc
        </Box>
        <Box paddingTop={1} paddingBottom={1} paddingRight={2}>
          <b>{requestTime}</b>
        </Box>
      </Box>
    </div>
  );
}

function OrderInitStatus(props) {
  const tag = props.statusTag === 'INIT' ? 'Đã Nhận Yêu Cầu' : ``;
  return (
    <div>
      <Box
        component="div"
        style={{ backgroundColor: `${props.stateColor}` }}
        p={1}
        display="inline"
        bgcolor="primary.main"
        color="primary.contrastText"
      >
        {tag}
      </Box>{' '}
      {/* statusTag: Tag trạng thái của log */}
      <Box marginTop={1} marginBottom={3} component="div" bgcolor="info.main">
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
  stateColor: PropTypes.string,
};

export default memo(OrderInitStatus);
