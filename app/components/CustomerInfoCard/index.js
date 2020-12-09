/**
 *
 * CustomerInfoCard
 *
 */

import { Box, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CustomerInfoCard({
  customerId,
  customerName,
  companyName,
  amount,
  feeAmount,
}) {
  return (
    <Card variant="outlined" square>
      <CardContent>
        <div>
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
              <b>{customerId}</b>
            </Box>
          </Box>

          <Box display="flex">
            <Box p={1} flexGrow={1}>
              Tên công ty
            </Box>
            <Box p={1}>
              <b>{companyName}</b>
            </Box>
          </Box>

          <Box display="flex">
            <Box p={1} flexGrow={1}>
              Tên khách hàng
            </Box>
            <Box p={1}>
              <b>{customerName}</b>
            </Box>
          </Box>

          <Box display="flex">
            <Box p={1} flexGrow={1}>
              Số tiền ứng lương
            </Box>
            <Box p={1}>
              <b>{amount}</b>
            </Box>
          </Box>
          <Box display="flex">
            <Box p={1} flexGrow={1}>
              Phí
            </Box>
            <Box p={1}>
              <b>{feeAmount}</b>
            </Box>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}

CustomerInfoCard.propTypes = {
  customerId: PropTypes.string,
  customerName: PropTypes.string,
  companyName: PropTypes.string,
  amount: PropTypes.number,
  feeAmount: PropTypes.number,
};

export default CustomerInfoCard;
