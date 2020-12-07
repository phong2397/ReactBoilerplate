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

function BankCard(props) {
  return (
    <Card>
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
            <b>{props.bankName}</b>
          </Box>
        </Box>
        <Box display="flex">
          <Box p={1} flexGrow={1}>
            Số tài khoản
          </Box>
          <Box p={1}>
            <b>{props.bankNo}</b>
          </Box>
        </Box>
        <Box display="flex">
          <Box p={1} flexGrow={1}>
            Chủ tài khoản
          </Box>
          <Box p={1}>
            <b>{props.accountName}</b>
          </Box>
        </Box>
        {/* </div> */}
      </CardContent>
    </Card>
  );
}
BankCard.propTypes = {
  bankName: PropTypes.string,
  bankNo: PropTypes.number,
  accountName: PropTypes.string,
};

export default BankCard;
