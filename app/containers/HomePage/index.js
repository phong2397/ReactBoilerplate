/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

import makeSelectHomePage, {
  makeSelectAmount,
  makeSelectDefaultAmount,
  makeSelectFeeAmount,
  makeSelectStep,
  makeSelectRate,
  makeSelectLoading,
  makeSelectProductConfig,
  makeSelectOpenDialog,
} from './selectors';
import CustomizedSlider from '../../components/CustomizeSlider';
import FeeToolTip from '../../components/FeeTooltip';
import BankCard from '../../components/BankCard';
import {
  changeSelectAmount,
  confirmAlert,
  goToProfile,
  loadingProductConfig,
  requestOrder,
} from './actions';
import { makeSelectCurrentProfile } from '../App/selectors';

function convertWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(1),
      minHeight: '80vh',
    },
    rowStyle: {
      display: 'inline-block',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);

export function HomePage({
  loading,
  customer,
  productConfig,
  selectedAmount,
  step,
  feeAmount,
  onChangeSlider,
  loadProduct,
  handleRequestOrder,
  openDialog,
  handleClose,
  handleCloseAndGo,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  useEffect(() => {
    if (loading) {
      loadProduct();
    }
  });
  console.log('CUSTOMER ?', customer);
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.rowStyle}>
        <Typography variant="subtitle1" align="center">
          Mức lớn nhất bạn có thể ứng{' '}
          {customer && convertWithCommas(customer.customerSalary)}đ
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.rowStyle}>
        <Typography variant="subtitle1" align="center">
          Số tiền lương được ứng
        </Typography>
        <Typography color="primary" variant="h3" align="center">
          <b>{convertWithCommas(Number(selectedAmount))}đ</b>
        </Typography>
        <Box px={3}>
          <CustomizedSlider
            min={productConfig.productAmountMin}
            step={step}
            max={customer ? customer.customerSalary : 0}
            defaultValue={productConfig.productAmountMax}
            value={Number(selectedAmount)}
            onChange={onChangeSlider}
          />
        </Box>
        <Typography variant="subtitle2" align="center" display="block">
          Phí: {convertWithCommas(feeAmount)}đ
          <FeeToolTip
            amount={Number(selectedAmount)}
            rate={productConfig.productRate}
          />
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} className={classes.rowStyle}>
        <BankCard
          bankName={customer && customer.bankName}
          accNo={customer && customer.accNo}
          accName={customer && customer.accName}
        />
      </Grid>
      <Grid item xs={12} className={classes.rowStyle}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRequestOrder}
        >
          <b>Yêu cầu ứng lương</b>
        </Button>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Chưa đủ điều kiện</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vui lòng bổ sung thông tin cá nhân
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Xác nhận
            </Button>
            <Button onClick={handleCloseAndGo} color="default">
              Bổ sung thông tin
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  customer: PropTypes.object,
  productConfig: PropTypes.object.isRequired,
  selectedAmount: PropTypes.number,
  step: PropTypes.number,
  onChangeSlider: PropTypes.func,
  feeAmount: PropTypes.number,
  loadProduct: PropTypes.func.isRequired,
  handleRequestOrder: PropTypes.func,
  handleClose: PropTypes.func,
  handleCloseAndGo: PropTypes.func,
  openDialog: PropTypes.bool,
};
const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  homePage: makeSelectHomePage(),
  customer: makeSelectCurrentProfile(),
  productConfig: makeSelectProductConfig(),
  selectedAmount: makeSelectAmount(),
  step: makeSelectStep(),
  defaultAmount: makeSelectDefaultAmount(),
  feeAmount: makeSelectFeeAmount(),
  rate: makeSelectRate(),
  openDialog: makeSelectOpenDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeSlider: (evt, newValue) => dispatch(changeSelectAmount(newValue)),
    loadProduct: () => dispatch(loadingProductConfig()),
    handleRequestOrder: () => dispatch(requestOrder()),
    handleClose: () => dispatch(confirmAlert()),
    handleCloseAndGo: () => dispatch(goToProfile()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
