/* eslint-disable no-console */
/**
 *
 * ProfileInfoPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { TextField, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import SubContent from '../SubContent/Loadable';
import { makeSelectCurrentProfile } from '../App/selectors';
import { loadEditableProfile, requestUpdateProfile } from './actions';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  grid: {
    flexWrap: 'wrap',
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  image: {
    position: 'relative',
    height: 200,
    width: '100% !important',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));
export function ProfileInfoPage({
  customer,
  loading,
  loadCurrentProfile,
  onSubmitUpdateProfile,
}) {
  useInjectReducer({ key: 'profileInfoPage', reducer });
  useInjectSaga({ key: 'profileInfoPage', saga });
  useEffect(() => {
    if (loading) {
      loadCurrentProfile(customer);
    }
  });
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  console.log('CUSTOMER ', customer);
  const onSubmit = data => {
    onSubmitUpdateProfile(data);
  };
  return (
    <SubContent title="Thông tin người dùng">
      <form
        id="form-profile"
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box pt={1.5} pr={2} component="div">
          <TextField
            id="customerName"
            name="customerName"
            label="Họ và tên"
            defaultValue={customer.customerName}
            variant="filled"
            inputRef={register({
              required: 'Họ và tên không được để trống',
            })}
            error={!!errors.customerName}
            helperText={errors.customerName ? errors.customerName.message : ''}
          />
          <TextField
            id="customerCode"
            name="customerCode"
            label="Mã nhân viên"
            defaultValue={customer.customerCode}
            variant="filled"
            inputRef={register({
              required: 'Mã nhân viên không được để trống',
            })}
            error={!!errors.customerCode}
            helperText={errors.customerCode ? errors.customerCode.message : ''}
          />
          <TextField
            id="companyName"
            name="companyName"
            label="Làm việc tại"
            defaultValue={customer.companyName}
            variant="filled"
            inputRef={register({
              required: 'Nơi làm việc không được để trống',
            })}
            error={!!errors.companyName}
            helperText={errors.companyName ? errors.companyName.message : ''}
          />
          <TextField
            disabled
            id="customerSalary"
            name="customerSalary"
            label="Hạn mức lương"
            defaultValue={customer.customerSalary}
            variant="filled"
            inputRef={register({
              required: 'Hạn mức lương không được để trống',
            })}
            error={!!errors.customerSalary}
            helperText={
              errors.customerSalary ? errors.customerSalary.message : ''
            }
          />
          <TextField
            id="customerId"
            name="customerId"
            label="CMND/CCCD"
            defaultValue={customer.customerId}
            variant="filled"
            inputRef={register({
              required: 'CMND/CCCD không được để trống',
            })}
            error={!!errors.customerId}
            helperText={errors.customerId ? errors.customerId.message : ''}
          />
          <TextField
            id="customerAddress"
            name="customerAddress"
            label="Địa chỉ"
            defaultValue={customer.customerAddress}
            variant="filled"
            inputRef={register({ required: 'Địa chỉ không được để trống' })}
            error={!!errors.customerAddress}
            helperText={
              errors.customerAddress ? errors.customerAddress.message : ''
            }
          />
          <TextField
            id="customerIdDate"
            name="customerIdDate"
            label="Ngày cấp"
            defaultValue={customer.customerIdDate}
            variant="filled"
            inputRef={register({
              required: 'Ngày cấp không được để trống',
            })}
            error={!!errors.customerIdDate}
            helperText={
              errors.customerIdDate ? errors.customerIdDate.message : ''
            }
          />
          <TextField
            id="customerIdLocation"
            name="customerIdLocation"
            label="Nơi cấp"
            defaultValue={customer.customerIdLocation}
            variant="filled"
            inputRef={register({ required: 'Nơi cấp không được để trống' })}
            error={!!errors.customerIdLocation}
            helperText={
              errors.customerIdLocation ? errors.customerIdLocation.message : ''
            }
          />
          <TextField
            id="bankName"
            name="bankName"
            label="Ngân hàng"
            defaultValue={customer.bankName}
            variant="filled"
            inputRef={register({
              required: 'Ngân hàng không được để trống',
            })}
            error={!!errors.bankName}
            helperText={errors.bankName ? errors.bankName.message : ''}
          />
          <TextField
            id="accNo"
            name="accNo"
            label="Số tài khoản"
            defaultValue={customer.accNo}
            variant="filled"
            inputRef={register({
              required: 'Số tài khoản không được để trống',
            })}
            error={!!errors.accNo}
            helperText={errors.accNo ? errors.accNo.message : ''}
          />
          <TextField
            id="accName"
            name="accName"
            label="Chủ tài khoản"
            defaultValue={customer.accName}
            variant="filled"
            inputRef={register({
              required: 'Chủ tài khoản không được để trống',
            })}
            error={!!errors.accName}
            helperText={errors.accName ? errors.accName.message : ''}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className={classes.button}
        >
          Cập nhật
        </Button>
      </form>
    </SubContent>
  );
}

ProfileInfoPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  customer: PropTypes.object,
  loadCurrentProfile: PropTypes.func,
  onSubmitUpdateProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  customer: makeSelectCurrentProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadCurrentProfile: customer => dispatch(loadEditableProfile(customer)),
    onSubmitUpdateProfile: newProfile => {
      console.log('REQUEST UPDATE NEW PROFILE ', newProfile);
      dispatch(requestUpdateProfile(newProfile));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileInfoPage);
