/**
 *
 * LoginPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import { KeyboardBackspaceOutlined } from '@material-ui/icons';
import OtpInput from 'react-otp-input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import PhoneInput from 'components/PhoneInput';
import { Alert, Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Background from 'images/bg.svg';
import makeSelectLoginPage, {
  makeSelectCompanyId,
  makeSelectCompanyList,
  makeSelectLoading,
  makeSelectLoginStep,
  makeSelectOtp,
  makeSelectPhone,
  makeSelectServerError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  changeOtp,
  checkUserExistAction,
  goBackInput,
  loadCompanyListAction,
  requestLoginAction,
} from './actions';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.sgfintech.com.vn/">
        Sgfintech
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const convertErrorStatus = code => {
  switch (code) {
    case '019':
      return { field: 'phone', message: 'Số điện thoại không hợp lệ' };
    case '013':
      return { field: 'all', message: 'Yêu cầu gửi mã xác nhận quá nhiều' };
    case '014':
      return {
        field: 'otp',
        message: 'Mã OTP không chính xác. Bạn vui lòng nhập lại',
      };
    case '028':
      return {
        field: 'phone',
        message: 'Số điện thoại không tồn tại trên hệ thống',
      };
    case '029':
      return { field: 'companyId', message: 'Mã công ty không hợp lệ' };
    default:
      return {
        field: 'all',
        message: 'Máy chủ đang bảo trì, vui lòng chờ trong giây lát',
      };
  }
};
const errorMessageType = {
  phoneErrorMessage: 'Số điện thoại gồm 10 chữ số',
  otpErrorMessage: 'Mã xác nhận gồm 6 chữ số',
  notEmpty: 'Không được để trống',
};
const schema = yup.object().shape({
  companyId: yup.string().required(errorMessageType.notEmpty),
  phone: yup
    .string()
    .min(12, errorMessageType.phoneErrorMessage)
    .max(12, errorMessageType.phoneErrorMessage)
    .required(errorMessageType.notEmpty),
  otp: yup.string(),
});
const schemaOtp = yup.object().shape({
  otp: yup
    .string()
    .min(6, errorMessageType.otpErrorMessage)
    .max(6, errorMessageType.otpErrorMessage),
  // .required(errorMessageType.notEmpty),
});
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.companyCode,
});
export function LoginPage({
  dispatch,
  loginStep,
  errorServer,
  loading,
  companyList,
}) {
  const [otp, setOtp] = useState('');
  const [errorOtp, setErrorOtp] = useState(null);
  const [errorAll, setErrorAll] = useState(null);
  // const [compnayId, setCompanyId] = useState('');
  // const [phone, setPhone] = useState('');

  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    dispatch(loadCompanyListAction());
  }, []);
  useEffect(() => {
    if (errorServer) {
      const errorConvert = convertErrorStatus(errorServer.ResponseCode);
      if (errorConvert.field === 'otp')
        setErrorOtp({ message: errorConvert.message });
      if (errorConvert.field === 'all')
        setErrorAll({ message: errorConvert.message });
      setError(errorConvert.field, {
        type: 'manual',
        message: errorConvert.message,
      });
    }
  }, [errorServer]);
  const classes = useStyles();
  const onSubmit = data => {
    const { companyId, phone } = data;
    const p = phone.replace(/ /g, '');
    dispatch(checkUserExistAction({ companyId, phone: p }));
  };
  const handleLogin = () => {
    schemaOtp.isValid({ otp }).then(valid => {
      if (valid) {
        dispatch(changeOtp(otp));
        dispatch(requestLoginAction(otp));
        setOtp('');
        setErrorOtp(null);
      } else {
        setErrorOtp({
          message: errorMessageType.otpErrorMessage,
        });
      }
    });
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={8} md={7} className={classes.image} />
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        {loginStep === 0 && (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {errorAll && (
                      <Alert severity="error">{errorAll.message}</Alert>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel error={!!errors.companyId} component="legend">
                        Mã công ty
                      </FormLabel>
                      <Autocomplete
                        id="filter-demo"
                        options={companyList}
                        filterOptions={filterOptions}
                        getOptionLabel={option => option.companyCode}
                        renderInput={params => (
                          <TextField
                            {...params}
                            required
                            fullWidth
                            id="companyId"
                            placeholder="Nhập mã công ty"
                            name="companyId"
                            variant="outlined"
                            inputRef={register}
                            error={!!errors.companyId}
                          />
                        )}
                      />

                      <FormHelperText error={!!errors.companyId} id="companyId">
                        {errors.companyId && errors.companyId.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel error={!!errors.phone} component="legend">
                        Số điện thoại
                      </FormLabel>
                      <TextField
                        required
                        fullWidth
                        id="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        name="phone"
                        variant="outlined"
                        InputProps={{
                          inputComponent: PhoneInput,
                        }}
                        inputRef={register}
                        error={!!errors.phone}
                      />
                      <FormHelperText error={!!errors.phone} id="companyId">
                        {errors.phone && errors.phone.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                {!loading ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Gửi mã xác nhận
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Gửi mã xác nhận
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
        {loginStep === 1 && (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Mã xác nhận
            </Typography>
            <IconButton onClick={() => dispatch(goBackInput())}>
              <KeyboardBackspaceOutlined />
            </IconButton>
            <form className={classes.form} noValidate>
              <Grid container>
                <Grid item xs={12}>
                  {errorAll && (
                    <Alert severity="error">{errorAll.message}</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl error={!!errorOtp} fullWidth>
                    <OtpInput
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={setOtp}
                      w={1}
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
                        height: 45,
                        width: 45,
                        border: '1px solid #000000',
                      }}
                      separator={<span> &nbsp; &nbsp;</span>}
                    />
                    <FormHelperText
                      id="otp"
                      style={{ textAlign: 'center' }}
                      error={!!errorOtp}
                    >
                      {errorOtp && errorOtp.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <div>
                {!loading ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleLogin}
                  >
                    Đăng nhập
                  </Button>
                ) : (
                  <Button
                    disabled
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Đăng nhập
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginStep: PropTypes.number,
  errorServer: PropTypes.any,
  loading: PropTypes.bool,
  companyList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  loginPage: makeSelectLoginPage(),
  companyId: makeSelectCompanyId(),
  phone: makeSelectPhone(),
  loginStep: makeSelectLoginStep(),
  otp: makeSelectOtp(),
  errorServer: makeSelectServerError(),
  companyList: makeSelectCompanyList(),
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

export default compose(withConnect)(LoginPage);
