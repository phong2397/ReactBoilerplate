/**
 *
 * OrderRepaymentStatus
 *
 */

import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

function repaymentStatus(repayTime) {
  return (
    <div>
      <Box display="flex">
        <Box p={2} flexGrow={1}>
          Thời gian
        </Box>
        <Box p={2}>
          <b>{repayTime}</b>
        </Box>
      </Box>
    </div>
  );
}

function OrderRepaymentStatus(props) {
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
        {props.statusTag}
      </Box>{' '}
      {/* statusTag: Tag trạng thái của log */}
      <Box marginTop={1} marginBottom={3} component="div" bgcolor="info.main">
        {repaymentStatus(props.repayTime)}
      </Box>
    </div>
  );
}

OrderRepaymentStatus.propTypes = {
  statusTag: PropTypes.string,
  repayTime: PropTypes.string,
  stateColor: PropTypes.string,
};

export default memo(OrderRepaymentStatus);
