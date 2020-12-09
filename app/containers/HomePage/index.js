/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
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
  makeSelectAccName,
  makeSelectAmount,
  makeSelectBankName,
  makeSelectAccNo,
  makeSelectCreditAmount,
  makeSelectDefaultAmount,
  makeSelectFeeAmount,
  makeSelectStep,
  makeSelectRate,
} from './selectors';
import CustomizedSlider from '../../components/CustomizeSlider';
import FeeToolTip from '../../components/FeeTooltip';
import BankCard from '../../components/BankCard';
import { changeSelectAmount } from './actions';

function convertWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      // margin: theme.spacing(3),
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
  creditAmount,
  selectedAmount,
  step,
  defaultAmount,
  feeAmount,
  bankName,
  accNo,
  accName,
  onChangeSlider,
  rate,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.rowStyle}>
        <Typography variant="subtitle1" align="center">
          Mức lớn nhất bạn có thể ứng: {convertWithCommas(creditAmount)}đ
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.rowStyle}>
        <Typography variant="subtitle1" align="center">
          Số tiền lương được ứng:
        </Typography>
        <Typography color="primary" variant="h3" align="center">
          <b>{convertWithCommas(selectedAmount)}đ</b>
        </Typography>
        <Box px={3}>
          <CustomizedSlider
            min={0}
            step={step}
            max={creditAmount}
            defaultValue={defaultAmount}
            onChange={onChangeSlider}
          />
        </Box>
        <Typography variant="subtitle2" align="center" display="block">
          Phí: {convertWithCommas(feeAmount)}đ
          <FeeToolTip amount={selectedAmount} rate={rate} />
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} className={classes.rowStyle}>
        <BankCard bankName={bankName} accNo={accNo} accName={accName} />
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
  creditAmount: PropTypes.number,
  selectedAmount: PropTypes.number,
  step: PropTypes.number,
  defaultAmount: PropTypes.number,
  onChangeSlider: PropTypes.func,
  feeAmount: PropTypes.number,
  bankName: PropTypes.string,
  accNo: PropTypes.string,
  accName: PropTypes.string,
  rate: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  creditAmount: makeSelectCreditAmount(),
  selectedAmount: makeSelectAmount(),
  step: makeSelectStep(),
  defaultAmount: makeSelectDefaultAmount(),
  feeAmount: makeSelectFeeAmount(),
  rate: makeSelectRate(),
  bankName: makeSelectBankName(),
  accNo: makeSelectAccNo(),
  accName: makeSelectAccName(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeSlider: (evt, newValue) => dispatch(changeSelectAmount(newValue)),
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
