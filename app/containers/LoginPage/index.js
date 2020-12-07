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
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  KeyboardBackspaceOutlined,
  SmartphoneOutlined,
  Textsms,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage, {
  makeSelectCompanyId,
  makeSelectPhone,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import OtpInputCard from '../../components/OtpInputCard';
import { changeCompanyId, changePhone, requestOtpAction } from './actions';
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
  }),
);
export function LoginPage({
  companyId,
  phone,
  onChangePhone,
  onChangeCompanyId,
  onSubmitRequestOtp,
}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  // const changeScreen = index => {
  //   setValue(index);
  return (
    <div className={classes.paper}>
      <Switch>
        <Route exact path="/login">
          <div>
            <div className={classes.appHeader}>
              <SmartphoneOutlined style={{ fontSize: 40 }} />
              <Typography variant="h4" gutterBottom>
                Đăng Nhập
              </Typography>
            </div>
            <form
              className={classes.form}
              noValidate
              // onSubmit={onSubmitRequestOtp}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Nhập mã công ty"
                value={companyId}
                onChange={onChangeCompanyId}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Số điện thoại"
                value={phone}
                onChange={onChangePhone}
              />
              <Box pt={1}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  // component={Link}
                  // to="/login/verify"
                  onClick={onSubmitRequestOtp}
                >
                  Gửi OTP
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
        </Route>
      </Switch>
    </div>
  );
}
LoginPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  companyId: PropTypes.string,
  phone: PropTypes.string,
  onChangeCompanyId: PropTypes.func,
  onChangePhone: PropTypes.func,
  onSubmitRequestOtp: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  companyId: makeSelectCompanyId(),
  phone: makeSelectPhone(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCompanyId: evt => dispatch(changeCompanyId(evt.target.value)),
    onChangePhone: evt => dispatch(changePhone(evt.target.value)),
    onSubmitRequestOtp: () => dispatch(requestOtpAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
