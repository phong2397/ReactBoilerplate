/**
 *
 * BankCard
 *
 */

import React from 'react';
import { Card, CardContent, Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/styles';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function BankCard({ bankName, accNo, accName }) {
  return (
    <Card variant="outlined" square>
      <CardContent>
        {/* <div style={{ width: "100%" }} bgcolor="grey.300"> */}
        <Box display="flex" justifyContent="center">
          <Box p={1}>
            <Typography variant="subtitle1">Tài khoản nhận tiền</Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box p={1} flexGrow={1}>
            Ngân hàng
          </Box>
          <Box p={1}>
            <b>{bankName}</b>
          </Box>
        </Box>
        <Box display="flex">
          <Box p={1} flexGrow={1}>
            Số tài khoản
          </Box>
          <Box p={1}>
            <b>{accNo}</b>
          </Box>
        </Box>
        <Box display="flex">
          <Box p={1} flexGrow={1}>
            Chủ tài khoản
          </Box>
          <Box p={1}>
            <b>{accName}</b>
          </Box>
        </Box>
        {/* </div> */}
      </CardContent>
    </Card>
  );
}
BankCard.propTypes = {
  bankName: PropTypes.string,
  accNo: PropTypes.string,
  accName: PropTypes.string,
};

export default BankCard;
