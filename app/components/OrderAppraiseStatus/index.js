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
  let tag;
  switch (props.statusTag) {
    case 'WAITING':
      tag = 'Đang Chờ Xác Nhận';
      break;
    case 'PASS':
      tag = 'Xác Nhận Thành Công';
      break;
    case 'DENI':
      tag = 'Yêu Cầu Đã Bị Từ Chối';
      break;
    default:
      tag = 'Xác Nhận';
      break;
  }

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
        {tag}
      </Box>{' '}
      {/* statusTag: Tag trạng thái của log */}
      {!(props.statusTag === '' || props.statusTag === 'WAITING') ? (
        <Box marginTop={1} marginBottom={3} component="div" bgcolor="info.main">
          {appraiseStatus(props.resolveTime)}
        </Box>
      ) : (
        <span />
      )}
    </div>
  );
}

OrderAppraiseStatus.propTypes = {
  resolveTime: PropTypes.string,
  statusTag: PropTypes.string,
  stateColor: PropTypes.string,
};

export default memo(OrderAppraiseStatus);
