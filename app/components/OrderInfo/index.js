/**
 *
 * OrderInfo
 *
 */

import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function OrderInfo(props) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          {/* Title Ma don yeu cau */}
          <Grid item xs={6}>
            <Typography color="textSecondary" gutterBottom>
              {' '}
              Mã đơn yêu cầu{' '}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography color="textSecondary" align="right" gutterBottom>
              {' '}
              VNĐ{' '}
            </Typography>
          </Grid>
          <Divider />

          {/* Ma don yeu cau */}
          <Grid item xs={6}>
            <Typography variant="h5" component="h2">
              {props.orderId}
            </Typography>
          </Grid>

          <Grid item xs={6} />
          <Divider />

          {/* Trang thai */}
          <Grid item xs={6}>
            <Typography color="textSecondary"> Trạng thái </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography align="right" color="textSecondary">
              {props.orderStatus}
            </Typography>
          </Grid>
          <Divider />

          {/*  So tien */}
          <Grid item xs={6}>
            <Typography variant="body2" component="p">
              {' '}
              Số tiền{' '}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" align="right" component="p">
              {props.orderAmount}
            </Typography>
          </Grid>
          <Divider />

          {/*  Ngay gui yeu cau */}
          <Grid item xs={6}>
            <Typography variant="body2" component="p">
              {' '}
              Ngày gửi{' '}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" align="right" component="p">
              {props.submitTime}
            </Typography>
          </Grid>
          <Divider />
        </Grid>
      </CardContent>
    </Card>
  );
}

OrderInfo.propTypes = {
  orderId: PropTypes.string,
  orderStatus: PropTypes.string,
  orderAmount: PropTypes.string,
  submitTime: PropTypes.string,
};

export default memo(OrderInfo);
