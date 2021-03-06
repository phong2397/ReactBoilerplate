/**
 *
 * CustomerInfoCard
 *
 */

import { Box, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { convertWithCommas } from '../../utils/formater';
// import styled from 'styled-components';

function CustomerInfoCard({
  customerCode,
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
              <b>{customerCode}</b>
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
              <b>{convertWithCommas(amount)}đ</b>
            </Box>
          </Box>
          <Box display="flex">
            <Box p={1} flexGrow={1}>
              Phí
            </Box>
            <Box p={1}>
              <b>{convertWithCommas(feeAmount)}đ</b>
            </Box>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}

CustomerInfoCard.propTypes = {
  customerCode: PropTypes.string,
  customerName: PropTypes.string,
  companyName: PropTypes.string,
  amount: PropTypes.number,
  feeAmount: PropTypes.number,
};

export default CustomerInfoCard;
