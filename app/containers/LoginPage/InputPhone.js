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
import { Link } from 'react-router-dom';
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
export function InputPhone() {
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
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nhập mã công ty"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Số điện thoại"
        />
        <Box pt={1}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            component={Link}
            to="/login/verify"
          >
            Gửi OTP
          </Button>
        </Box>
      </form>
    </div>
  );
}

// LoginPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default InputPhone;
