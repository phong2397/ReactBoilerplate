/* eslint-disable indent */
/**
 *
 * OrderForm
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import { Alert } from '@material-ui/lab';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import HelpButton from 'components/HelpButton';
import CustomizedSlider from 'components/CustomizedSlider';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setOrderFeeValue, setOrderValue } from 'utils/storage';
import InfoBox from 'components/InfoBox';
import makeSelectOrderForm, {
  makeSelectDefaultValue,
  makeSelectMax,
  makeSelectMin,
  makeSelectValue,
  makeSelectRate,
  makeSelectDisbursedAmount,
  makeSelectMaxAdvance,
  makeSelectCanSlide,
  makeSelectNoticeError,
  makeSelectShowMark,
  makeSelectAdvanceCount,
  makeSelectRateAdvance,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import { changeValue, loadProductConfig, requestOrder } from './actions';
import DetailRequest from '../../components/DetailRequest';
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function OrderForm({
  dispatch,
  showMark,
  min,
  max,
  rate,
  value,
  disbursedAmount,
  maxAdvance,
  canSlide,
  noticeError,
  advanceCount,
  rateAdvance,
}) {
  const [selectedValue, setSelectedValue] = useState(0);
  useInjectReducer({ key: 'orderForm', reducer });
  useInjectSaga({ key: 'orderForm', saga });
  const titleRef = useRef(null);
  useEffect(() => {
    dispatch(loadProductConfig());
    titleRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, []);
  useEffect(() => {
    dispatch(changeValue(maxAdvance));
    setSelectedValue(maxAdvance + disbursedAmount);
  }, [max, min]);
  useEffect(() => {
    setOrderValue(value);
    setOrderFeeValue(Number.parseFloat((value * rate) / 100).toFixed(0));
  }, [value]);
  const marks = [
    {
      value: min,
      label: `${numberWithCommas(min)} đ`,
    },
    {
      value: disbursedAmount > min ? disbursedAmount - 1 : min - 1,
      label: `Đã ứng ${numberWithCommas(disbursedAmount)} đ`,
    },
    {
      value: maxAdvance + disbursedAmount + 1,
      label: `Có thể yêu cầu ${numberWithCommas(maxAdvance)} đ`,
    },
    {
      value: max,
      label: `Lương ${numberWithCommas(max)} đ`,
    },
  ];
  const handleChange = (event, newValue) => {
    const maxSlide = maxAdvance + disbursedAmount;
    if (newValue >= disbursedAmount + min && newValue <= maxSlide) {
      setSelectedValue(newValue);
      dispatch(changeValue(newValue - disbursedAmount));
    }
    if (newValue >= disbursedAmount + maxAdvance) {
      setSelectedValue(disbursedAmount + maxAdvance);
      dispatch(changeValue(maxSlide - disbursedAmount));
    }
    if (newValue <= disbursedAmount && disbursedAmount > min) {
      setSelectedValue(disbursedAmount);
      dispatch(changeValue(min));
    }
  };
  return (
    <Paper elevation={3} variant="outlined" square>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        <Box ref={titleRef} mt={3} fontWeight="fontWeightBold">
          Chọn mức ứng lương
        </Box>
      </Typography>

      <Box m={4}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            {!canSlide && <Alert severity="warning">{noticeError}</Alert>}
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              <Box mb={4} flexGrow={1} align="center">
                {canSlide && (
                  <Typography variant="h3" color="primary">
                    <b>{numberWithCommas(value)}đ</b>
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          {canSlide && (
            <Grid item xs={12}>
              <CustomizedSlider
                key="slider"
                min={min}
                step={50000}
                max={max}
                value={selectedValue}
                onChange={handleChange}
                marks={showMark && marks.filter(x => x)}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            {canSlide && (
              <Grid container>
                <Grid item xs={12}>
                  <Box align="center" component="div">
                    <DetailRequest
                      label={
                        <span>
                          Phí{' '}
                          <b>
                            {numberWithCommas(
                              Number.parseFloat((value * rate) / 100).toFixed(
                                0,
                              ),
                            )}
                          </b>{' '}
                          đ
                        </span>
                      }
                      content={
                        <InfoBox
                          content={
                            <>
                              <Typography color="textSecondary" gutterBottom>
                                Chi tiết mức ứng
                              </Typography>
                              <Typography>
                                Số lần ứng: {advanceCount} lần
                              </Typography>
                              <Typography>
                                Hiện tại có thể ứng:{' '}
                                {numberWithCommas(Number(maxAdvance))} đ
                              </Typography>
                              <Typography>
                                Đã ứng:{' '}
                                {`${numberWithCommas(disbursedAmount)} đ`}
                              </Typography>
                              <Typography component="span">
                                <DetailRequest
                                  label={`Có thể ứng: ${numberWithCommas(
                                    maxAdvance + disbursedAmount,
                                  )} đ`}
                                  content={
                                    <div>
                                      <Box>
                                        (Số ngày công / Tổng ngày trong tháng) x{' '}
                                        {rateAdvance * 100}% x Lương
                                      </Box>
                                      <Box>
                                        =({new Date().getDate()} ngày /{' '}
                                        {daysInMonth(new Date())} ngày ) x{' '}
                                        {rateAdvance * 100}% x{' '}
                                        {numberWithCommas(Number(max))} đ ={' '}
                                        {numberWithCommas(
                                          Number(maxAdvance + disbursedAmount),
                                        )}{' '}
                                        đ
                                      </Box>
                                    </div>
                                  }
                                />
                              </Typography>
                              <Typography component="span">
                                <DetailRequest
                                  label={
                                    <span>
                                      Phí{' '}
                                      {numberWithCommas(
                                        Number.parseFloat(
                                          (value * rate) / 100,
                                        ).toFixed(0),
                                      )}
                                      đ
                                    </span>
                                  }
                                  content={`${rate}% x Mức yêu cầu = ${rate}% x ${numberWithCommas(
                                    value,
                                  )} đ = ${numberWithCommas(
                                    Number.parseFloat(
                                      (value * rate) / 100,
                                    ).toFixed(0),
                                  )} đ`}
                                />
                              </Typography>
                              <Typography>
                                Ngày đi làm: {`${new Date().getDate()} ngày`}
                              </Typography>
                            </>
                          }
                        />
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              disabled={!canSlide}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => dispatch(requestOrder({ value }))}
            >
              Tiếp tục
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

OrderForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showMark: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  rate: PropTypes.number,
  value: PropTypes.number,
  disbursedAmount: PropTypes.number,
  maxAdvance: PropTypes.number,
  rateAdvance: PropTypes.number,
  canSlide: PropTypes.bool,
  noticeError: PropTypes.string,
  advanceCount: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  orderForm: makeSelectOrderForm(),
  showMark: makeSelectShowMark(),
  min: makeSelectMin(),
  max: makeSelectMax(),
  rate: makeSelectRate(),
  defaultValue: makeSelectDefaultValue(),
  value: makeSelectValue(),
  disbursedAmount: makeSelectDisbursedAmount(),
  maxAdvance: makeSelectMaxAdvance(),
  canSlide: makeSelectCanSlide(),
  noticeError: makeSelectNoticeError(),
  advanceCount: makeSelectAdvanceCount(),
  rateAdvance: makeSelectRateAdvance(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
function daysInMonth(anyDateInMonth) {
  return new Date(
    anyDateInMonth.getFullYear(),
    anyDateInMonth.getMonth() + 1,
    0,
  ).getDate();
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrderForm);
