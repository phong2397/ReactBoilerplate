/**
 *
 * OrderAppraiseStatus
 *
 */

import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

function appraiseStatus(resolveTime) {
  return (
    <div>
      <Box display="flex">
        <Box p={2} flexGrow={1}>
          Thời gian xử lý
        </Box>
        <Box p={2}>
          <b>{resolveTime}</b>
        </Box>
      </Box>
    </div>
  );
}

function OrderAppraiseStatus(props) {
  return (
    <div>
      <Box
        component="div"
        p={1}
        style={{ backgroundColor: `${props.stateColor}` }}
        display="inline"
        bgcolor="primary.main"
        color="primary.contrastText"
      >
        {props.statusTag}
      </Box>{' '}
      {/* statusTag: Tag trạng thái của log */}
      <Box marginTop={1} marginBottom={3} component="div" bgcolor="info.main">
        {appraiseStatus(props.resolveTime)}
      </Box>
    </div>
  );
}

OrderAppraiseStatus.propTypes = {
  resolveTime: PropTypes.string,
  statusTag: PropTypes.string,
  stateColor: PropTypes.string,
};

export default memo(OrderAppraiseStatus);
