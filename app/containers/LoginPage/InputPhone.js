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
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SmartphoneOutlined } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

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
export function InputPhone({
  companyIdValue,
  phoneValue,
  onChangeCompanyId,
  onChangePhone,
  onSubmitForm,
}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const classes = useStyles();
  return (
    <div>
      <div className={classes.appHeader}>
        <SmartphoneOutlined style={{ fontSize: 40 }} />
        <Typography variant="h4" gutterBottom>
          Đăng Nhập
        </Typography>
      </div>
      <form className={classes.form} noValidate onSubmit={onSubmitForm}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nhập mã công ty"
          value={companyIdValue}
          onChange={evt => onChangeCompanyId(evt.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Số điện thoại"
          value={phoneValue}
          onChange={evt => onChangePhone(evt.target.value)}
        />
        <Box pt={1}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            // component={Link}
            // to="/login/verify"
          >
            Gửi OTP
          </Button>
        </Box>
      </form>
    </div>
  );
}

InputPhone.propTypes = {
  companyIdValue: PropTypes.string,
  phoneValue: PropTypes.string,
  onChangePhone: PropTypes.func,
  onChangeCompanyId: PropTypes.func,
  onSubmitForm: PropTypes.func,
};

export default InputPhone;
