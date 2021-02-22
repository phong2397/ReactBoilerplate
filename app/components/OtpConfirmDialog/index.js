/**
 *
 * OtpConfirmDialog
 *
 */

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
} from '@material-ui/core';

// import history from 'utils/history';
import React, { useEffect, useState } from 'react';

import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import OtpInput from 'react-otp-input';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
// import styled from 'styled-components';

const useStyles = makeStyles(() => ({
  root: {},
  dialogTitle: {
    fontSize: '25px',
    textAlign: 'center',
    borderBottom: '1px solid #000000',
    padding: '30px 20px 10px',
    margin: '0 30px',
  },
  dialogContentText: {
    fontSize: '18px',
    textAlign: 'center',
    color: '#000000',
    padding: '10px 20px 10px',
  },
}));

function OtpConfirmDialog({
  label,
  // phone,
  handleSendOtp,
  handleVerifyOtp,
  handleCloseDialog,
  errors,
  openDialog,
}) {
  const [open, setOpen] = useState(openDialog);
  const [value, setValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorOtp, setErrorOtp] = useState(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (value.length === 6) {
      setValid(true);
      setErrorOtp(null);
    } else {
      setValid(false);
    }
  }, [value]);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress <= 0) clearInterval(timer);
        return prevProgress <= 0 ? 0 : prevProgress - (1 / 60) * 100;
      });
    }, 1000);
    return () => clearInterval(timer);
  });
  // useEffect(() => {
  //   if (open) {
  //     setProgress(100);
  //     // handleSendOtp();
  //   } else {
  //     setValid(false);
  //     setErrorOtp(null);
  //     setValue('');
  //   }
  // }, [open]);
  useEffect(() => {
    setOpen(openDialog);
    if (openDialog) {
      setProgress(100);
    } else {
      setValid(false);
      setErrorOtp(null);
      setValue('');
    }
  }, [openDialog]);
  const classes = useStyles();
  const handleClickOpen = () => {
    handleSendOtp();
  };

  const handleClose = () => {
    // setOpen(false);
    handleCloseDialog();
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickOpen}
      >
        {label}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle
          id="form-dialog-title"
          disableTypography
          className={classes.dialogTitle}
        >
          Xác nhận gửi yêu cầu ứng lương
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            disableTypography
            className={classes.dialogContentText}
          >
            {/* Để xác thực yêu cầu, vui lòng nhập mã OTP (6 số) đã được gửi đến số
            điện thoại {phone} */}
            Quý khách vui lòng kiểm tra điện thoại và mã OTP
          </DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <OtpInput
                // autoFocus
                id="otp"
                name="otp"
                w={1}
                value={value}
                onChange={v => {
                  setValue(v);
                }}
                numInputs={6}
                otpType="number"
                disabled={false}
                isInputNum
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                }}
                inputStyle={{
                  height: '50px',
                  width: '50px',
                  border: '0.5px solid #b6b6b3',
                  fontSize: '20px',
                }}
                separator={<span> &nbsp; &nbsp;</span>}
              />
            </Grid>
            <Grid item xs={12}>
              {errors && <Alert severity="error">{errors.message}</Alert>}
              {errorOtp && <Alert severity="error">{errorOtp.message}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" m={4}>
                <CircularProgressWithLabel
                  progress={progress}
                  handleClickResend={() => {
                    setProgress(100);
                    handleSendOtp();
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          {valid ? (
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                handleVerifyOtp(value);
                handleCloseDialog();
                setValue('');
              }}
            >
              Xác nhận
            </Button>
          ) : (
            <Button disabled color="primary" variant="contained">
              Xác nhận
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

OtpConfirmDialog.propTypes = {
  label: PropTypes.string,
  // phone: PropTypes.string,
  handleSendOtp: PropTypes.func,
  handleVerifyOtp: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  errors: PropTypes.any,
  openDialog: PropTypes.bool,
};

export default OtpConfirmDialog;
