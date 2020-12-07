/**
 *
 * CustomerCard
 *
 */

import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  // makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function CustomerCard(props) {
  return (
    <Card m={10}>
      <CardContent>
        <div style={{ width: '100%' }} bgcolor="grey.300">
          <Box display="flex" justifyContent="center">
            <Box p={1}>
              <Typography variant="subtitle1">Thông tin khách hàng</Typography>
            </Box>
          </Box>

          <Box display="flex">
            <Box p={1} flexGrow={1}>
              Mã khách hàng
            </Box>
            <Box p={1}>
              <b>{props.customerCode}</b>
            </Box>
          </Box>

          <Box display="flex">
            <Box p={1} flexGrow={1}>
              Tên công ty
            </Box>
            <Box p={1}>
              <b>{props.companyName}</b>
            </Box>
          </Box>

          <Box display="flex">
            <Box p={1} flexGrow={1}>
              Tên khách hàng
            </Box>
            <Box p={1}>
              <b>{props.customerName}</b>
            </Box>
          </Box>

          <Box display="flex">
            <Box p={1} flexGrow={1}>
              Số tiền ứng lương
            </Box>
            <Box p={1}>
              <b>{props.amount}</b>
            </Box>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}

CustomerCard.propTypes = {
  customerCode: PropTypes.string,
  companyName: PropTypes.string,
  customerName: PropTypes.string,
  amount: PropTypes.number,
};

export default CustomerCard;
