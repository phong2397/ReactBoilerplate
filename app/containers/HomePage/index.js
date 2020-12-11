/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import {
  Box,
  Button,
  createStyles,
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
  makeSelectCreditAmount,
  makeSelectDefaultAmount,
  makeSelectFeeAmount,
  makeSelectStep,
  makeSelectRate,
  makeSelectLoading,
  makeSelectProductConfig,
} from './selectors';
import CustomizedSlider from '../../components/CustomizeSlider';
import FeeToolTip from '../../components/FeeTooltip';
import BankCard from '../../components/BankCard';
import { changeSelectAmount, loadingProductConfig } from './actions';
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
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  useEffect(() => {
    if (loading) {
      loadProduct();
    }
  });
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.rowStyle}>
        <Typography variant="subtitle1" align="center">
          Mức lớn nhất bạn có thể ứng
          {convertWithCommas(customer.creditAmount)}đ
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
            max={Number(customer.creditAmount)}
            defaultValue={productConfig.defaultAmount}
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
          bankName={customer.bankName}
          accNo={customer.accountNumber}
          accName={customer.accountName}
        />
      </Grid>
      <Grid item xs={12} className={classes.rowStyle}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          component={Link}
          to="/requestOrder"
        >
          <b>Yêu cầu ứng lương</b>
        </Button>
      </Grid>
    </Grid>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  customer: PropTypes.object.isRequired,
  productConfig: PropTypes.object.isRequired,
  selectedAmount: PropTypes.number,
  step: PropTypes.number,
  onChangeSlider: PropTypes.func,
  feeAmount: PropTypes.number,
  loadProduct: PropTypes.func.isRequired,
};
// customerName: action.customer.customer_name,
// customerId: action.customer.customer_code,
// companyName: action.customer.company_name,
// creditAmount: action.customer.customer_salary,
// idCard: action.customer.customer_id,
// customerAddress: action.customer.customer_address,
// idCardIssueDate: action.customer.customer_id_date,
// idCardIssuePlace: action.customer.customer_id_location,
// bankName: action.customer.customer_bank_name,
// accountNumber: action.customer.customer_bank_acc,
// accountName: action.customer.customer_bank,
const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  homePage: makeSelectHomePage(),
  customer: makeSelectCurrentProfile(),
  productConfig: makeSelectProductConfig(),
  creditAmount: makeSelectCreditAmount(),
  selectedAmount: makeSelectAmount(),
  step: makeSelectStep(),
  defaultAmount: makeSelectDefaultAmount(),
  feeAmount: makeSelectFeeAmount(),
  rate: makeSelectRate(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeSlider: (evt, newValue) => dispatch(changeSelectAmount(newValue)),
    loadProduct: () => dispatch(loadingProductConfig()),
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
