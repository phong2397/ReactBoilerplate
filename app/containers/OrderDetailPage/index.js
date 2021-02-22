/**
 *
 * OrderDetailPage
 *
 */

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  // TablePagination,
  // TableSortLabel,
  TableRow,
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core';

import saga from './saga';
import reducer from './reducer';
import { loadingAction, requestOrderDetail, refreshInitState } from './actions';
import makeSelectOrderDetailPage, {
  makeSelectOrder,
  makeSelectCustomer,
  makeSelectLoadState,
  makeSelectLoading,
} from './selectors';

// import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
// import TimelineDot from '@material-ui/lab/TimelineDot';

const useStyles = makeStyles(theme => ({
  timeline: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    height: '100%',
    marginBottom: 28,
  },
  loader: {
    margin: '0 auto',
    display: 'flex',
  },
}));

export function OrderDetailPage({
  dispatch,
  order,
  customer,
  loading,
  loadingState,
}) {
  useInjectReducer({ key: 'orderDetailPage', reducer });
  useInjectSaga({ key: 'orderDetailPage', saga });
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));
  useEffect(() => {
    dispatch(requestOrderDetail());
    return () => dispatch(refreshInitState());
  }, []);
  useEffect(() => {
    if (loadingState.customer && loadingState.order) {
      dispatch(loadingAction(false));
    }
  }, [loadingState]);
  const classes = useStyles();
  const steps = order.timeline;

  const headCells = [
    { id: 'stage', disablePadding: true, label: '' },
    { id: 'time', disablePadding: true, label: '' },
    { id: 'description', disablePadding: false, label: '' },
  ];

  return (
    <div>
      <Paper elevation={3} variant="outlined" square>
        {loading ? (
          <Box w={1} className={classes.loader} justifyContent="center">
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box m={3}>
            {/* Info */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper} variant="outlined" square>
                  <Typography variant="h6"> THÔNG TIN ĐƠN YÊU CẦU </Typography>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" components="subtitle2">
                        {`Mã đơn :`} <b>{order.orderId || 0} </b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" components="subtitle2">
                        {`Khách hàng:`} <b>{customer.fullname}</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" components="subtitle2">
                        {`Số lần ứng trong kì lương:`}{' '}
                        <b>{order.orderTimeBorrow || 0} lần</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" components="subtitle2">
                        {`Số tiền yêu cầu:`} <b>{order.orderAmount || 0} đ</b>
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle2" components="subtitle2">
                        {`Phần trăm phí:`}{' '}
                        <b>{order.orderInterestRate || 0} %</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" components="subtitle2">
                        {`Phí:`} <b>{order.orderFee || 0} đ</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" components="subtitle2">
                        {`Tổng số tiền cần thanh toán:`}{' '}
                        <b>{order.orderAmountTotal || 0} đ</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" components="subtitle2">
                        {`Ngày cần thanh toán:`}{' '}
                        <b>
                          {order.updatedTimeBororw &&
                            order.updatedTimeBororw.split(' ')[0]}
                        </b>
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper} variant="outlined" square>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        {' '}
                        THÔNG TIN TÀI KHOẢN NGÂN HÀNG{' '}
                      </Typography>
                      <Box>
                        <Typography variant="subtitle2" components="subtitle2">
                          {`Nguời thụ hưởng:`} <b>{customer.accName}</b>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" components="subtitle2">
                          {`Số tài khoản:`} <b>{customer.accNo}</b>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" components="subtitle2">
                          {`Tên ngân hàng:`} <b>{customer.bankName}</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        {' '}
                        THÔNG TIN NGÂN HÀNG HOÀN TRẢ{' '}
                      </Typography>
                      <Box>
                        <Typography variant="subtitle2" components="subtitle2">
                          {`Nguời thụ hưởng:`} <b>NGUYEN THE CAM HOAN</b>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" components="subtitle2">
                          {`Số tài khoản:`} <b>19022802937010</b>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" components="subtitle2">
                          {`Tên ngân hàng:`} <b>TECHCOMMBANK</b>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                {/* Timeline */}
                <Typography variant="h6"> TRẠNG THÁI ĐƠN YÊU CẦU </Typography>
                <div className={classes.timeline}>
                  <Stepper
                    activeStep={order.orderStatusCode || 0}
                    alternativeLabel={!matches}
                    orientation={matches ? 'vertical' : 'horizontal'}
                  >
                    {steps &&
                      steps.map(label => {
                        const labelProps = {};
                        // TODO: must fix condition
                        if (
                          label === 'Xét duyệt không thành công' ||
                          label === 'Giải ngân không thành công'
                        ) {
                          labelProps.error = true;
                        }
                        return (
                          <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                  </Stepper>
                </div>
              </Grid>
              <Grid item xs={12}>
                {/* Order Status Detail */}
                <Typography variant="h6">
                  {' '}
                  CHI TIẾT TRẠNG THÁI ĐƠN YÊU CẦU{' '}
                </Typography>
                <div>
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      size="medium"
                      aria-label="enhanced table"
                    >
                      <TableHead>
                        <TableRow>
                          {headCells.map(headCell => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.numeric ? 'right' : 'left'}
                              padding={
                                headCell.disablePadding ? 'none' : 'default'
                              }
                            />
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.detailTimeline &&
                          order.detailTimeline.map(row => (
                            <TableRow hover tabIndex={-1} key={row.stage}>
                              <TableCell align="center">{row.time}</TableCell>
                              <TableCell align="center">
                                {row.description}
                              </TableCell>
                              <TableCell align="left">
                                {row.note && row.note}
                                {/* {row.note} */}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </div>
  );
}

OrderDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object,
  customer: PropTypes.object,
  loading: PropTypes.bool,
  loadingState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  orderDetailPage: makeSelectOrderDetailPage(),
  order: makeSelectOrder(),
  customer: makeSelectCustomer(),
  loading: makeSelectLoading(),
  loadingState: makeSelectLoadState(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrderDetailPage);
