/**
 *
 * OrderDisbursementStatus
 *
 */

import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function disburseStatus(label, accName, accNo, bankName) {
  return (
    <div>
      <Box display="flex">
        <Box paddingTop={1} paddingLeft={2} flexGrow={1}>
          Tài khoản nhận tiền
        </Box>
        <Box paddingTop={1} paddingRight={2}>
          <b>{label}</b>
        </Box>
      </Box>
      <Box display="flex">
        <Box paddingTop={1} paddingLeft={2} flexGrow={1}>
          Chủ tài khoản
        </Box>
        <Box paddingTop={1} paddingRight={2}>
          <b>{accName}</b>
        </Box>
      </Box>
      <Box display="flex">
        <Box paddingTop={1} paddingLeft={2} flexGrow={1}>
          Số tài khoản
        </Box>
        <Box paddingTop={1} paddingRight={2}>
          <b>{accNo}</b>
        </Box>
      </Box>
      <Box display="flex">
        <Box paddingTop={1} paddingBottom={1} paddingLeft={2} flexGrow={1}>
          Ngân hàng
        </Box>
        <Box paddingTop={1} paddingRight={2}>
          <b>{bankName}</b>
        </Box>
      </Box>
    </div>
  );
}

function OrderDisbursementStatus(props) {
  return (
    <div>
      <Box
        component="div"
        style={{ backgroundColor: 'grey' }}
        p={1}
        display="inline"
        bgcolor="primary.main"
        color="primary.contrastText"
      >
        {' '}
        {props.statusTag}{' '}
      </Box>{' '}
      {/* statusTag: Tag trạng thái của log */}
      <Box component="div" bgcolor="info.main">
        {disburseStatus(
          props.label,
          props.accName,
          props.accNo,
          props.bankName,
        )}
      </Box>
    </div>
  );
}

OrderDisbursementStatus.propTypes = {
  label: PropTypes.string,
  accName: PropTypes.string,
  accNo: PropTypes.string,
  bankName: PropTypes.string,
  statusTag: PropTypes.string,
};

export default memo(OrderDisbursementStatus);
