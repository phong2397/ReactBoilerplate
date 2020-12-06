import React from 'react';
import {
  Box,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { KeyboardBackspaceOutlined, Textsms } from '@material-ui/icons';
import OtpInputCard from '../../components/OtpInputCard';

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      textAlign: 'center',
    },
    form: {
      width: '100%',
      padding: theme.spacing(2),
    },
    appHeader: {
      background: 'linear-gradient(to right, #3cb88c, #2cb0d0)',
      minWidth: '100%',
      minHeight: '30vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
  }),
);
export function InputOtp() {
  const classes = useStyles();
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <div className={classes.appHeader}>
        <Textsms style={{ fontSize: 40 }} />
        <Typography variant="h4" gutterBottom>
          Nhập mã OTP
        </Typography>
        <IconButton
          style={{
            color: '#ffff',
          }}
          component={Link}
          to="/login"
        >
          <KeyboardBackspaceOutlined />
        </IconButton>
      </div>
      <form className={classes.form} noValidate>
        <OtpInputCard
          // autoFocus
          w={1}
          OTPLength={6}
          otpType="number"
          disabled={false}
          containerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
          inputStyle={{
            height: '45px',
            width: '45px',
            border: '1px solid #000000',
          }}
          separator={<span>-</span>}
          // secure
        />
        <Box pt={1}>
          <Button variant="contained" fullWidth color="primary">
            Xác nhận OTP
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default InputOtp;
