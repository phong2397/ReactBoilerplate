/**
 *
 * OrderAppraiseStatus
 *
 */

import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function appraiseStatus(resolveTime) {
  return (
    <div>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          Thời gian xử lý
        </Box>
        <Box p={1}>
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
        display="inline"
        bgcolor="primary.main"
        color="primary.contrastText"
      >
        {props.statusTag}
      </Box>{' '}
      {/* statusTag: Tag trạng thái của log */}
      <Box component="div" bgcolor="info.main">
        {appraiseStatus(props.resolveTime)}
      </Box>
    </div>
  );
}

OrderAppraiseStatus.propTypes = {
  resolveTime: PropTypes.string,
  statusTag: PropTypes.string,
};

export default memo(OrderAppraiseStatus);
