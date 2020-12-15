/**
 *
 * LoginPage
 *
 */

import React from 'react';
import {
  Box,
  Button,
  createStyles,
  Fab,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  KeyboardBackspaceOutlined,
  SmartphoneOutlined,
  Textsms,
  LiveHelp,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Alert } from '@material-ui/lab';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import OtpInput from 'react-otp-input';
import makeSelectLoginPage, {
  makeSelectCompanyId,
  makeSelectError,
  makeSelectOtp,
  makeSelectPhone,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  changeCompanyId,
  changeOtp,
  changePhone,
  requestLoginAction,
  requestOtpAction,
} from './actions';

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      textAlign: 'center',
    },
    backSpace: {
      position: 'fixed',
      top: theme.spacing(4),
      left: theme.spacing(4),
    },
    paper: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 0,
    },
    control: {
      position: 'fixed',
      bottom: theme.spacing(1),
      right: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
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
    mainStyle: {
      // background: "rgb(60, 184, 140)",
      background:
        'linear - gradient(90deg, rgba(60, 184, 140, 1) 0 %, rgba(44, 176, 208, 1) 75 %)',
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
    },
  }),
);
const convertErrorStatus = code => {
  switch (code) {
    case '019':
      return 'Số điện thoại không hợp lệ';
    case '013':
      return 'Yêu cầu gửi mã xác nhận quá nhiều';
    case '014':
      return 'Mã xác nhận không đúng';
    default:
      return 'Lỗi không xác định';
  }
};
export function LoginPage({
  errorServer,
  companyId,
  phone,
  otp,
  onChangePhone,
  onChangeCompanyId,
  onChangeOtpInput,
  onSubmitRequestOtp,
  onSubmitValidateOtp,
}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const classes = useStyles();
  const schema = yup.object().shape({
    companyId: yup.string().required(),
    phone: yup.string().required(),
  });
  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
  });

  const onSubmit = () => onSubmitRequestOtp();
  const onSubmitOtp = () => {
    if (otp.length < 6) {
      console.log('error');
    } else {
      onSubmitValidateOtp();
    }
  };
  return (
    <div className={classes.paper}>
      <Switch>
        <Route exact path="/login">
          <div>
            <div className={classes.appHeader}>
              <SmartphoneOutlined style={{ fontSize: 40 }} />
              <Typography variant="h4" gutterBottom>
                <b>Đăng Nhập</b>
              </Typography>
            </div>

            <form
              autoComplete="off"
              className={classes.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              {errorServer && (
                <Alert severity="error">
                  {convertErrorStatus(errorServer.ResponseCode)}
                </Alert>
              )}
              <TextField
                fullWidth
                id="companyId"
                label="Mã công ty"
                name="companyId"
                inputRef={register({
                  required: 'Mã công ty không được để trống',
                })}
                margin="normal"
                variant="outlined"
                value={companyId}
                onChange={onChangeCompanyId}
                error={!!errors.companyId}
                helperText={errors.companyId ? errors.companyId.message : ''}
              />
              <TextField
                fullWidth
                id="phone"
                label="Số điện thoại"
                name="phone"
                inputRef={register({
                  required: 'Số điện thoại không được để trống',
                })}
                value={phone}
                onChange={onChangePhone}
                margin="normal"
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ''}
              />
              <Box pt={1}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  color="primary"
                >
                  <b>Gửi mã xác nhận</b>
                </Button>
              </Box>
            </form>
          </div>
        </Route>
        <Route path="/login/verify">
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
            {/* {<p>{otp}</p>} */}
            <form
              className={classes.form}
              onSubmit={handleSubmit(onSubmitOtp)}
              noValidate
            >
              {errorServer && (
                <Alert severity="error">
                  {convertErrorStatus(errorServer.ResponseCode)}
                </Alert>
              )}
              <Box p={1}>
                <OtpInput
                  // autoFocus
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={onChangeOtpInput}
                  w={1}
                  numInputs={6}
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
              </Box>
              <Box pt={1}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Xác nhận OTP
                </Button>
              </Box>
            </form>
          </div>
        </Route>
      </Switch>
      <Fab className={classes.fab} color="primary" aria-label="help">
        <LiveHelp />
      </Fab>
    </div>
  );
}
LoginPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  errorServer: PropTypes.any,
  companyId: PropTypes.string,
  phone: PropTypes.string,
  otp: PropTypes.string,
  onChangeCompanyId: PropTypes.func,
  onChangePhone: PropTypes.func,
  onChangeOtpInput: PropTypes.func,
  onSubmitRequestOtp: PropTypes.func,
  onSubmitValidateOtp: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  companyId: makeSelectCompanyId(),
  phone: makeSelectPhone(),
  otp: makeSelectOtp(),
  errorServer: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCompanyId: evt => dispatch(changeCompanyId(evt.target.value)),
    onChangePhone: evt => dispatch(changePhone(evt.target.value)),
    onChangeOtpInput: otp => dispatch(changeOtp(otp)),
    onSubmitRequestOtp: () => dispatch(requestOtpAction()),
    onSubmitValidateOtp: () => dispatch(requestLoginAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
