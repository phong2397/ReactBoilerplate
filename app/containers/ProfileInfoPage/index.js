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
import {
  TextField,
  Button,
  Box,
  ButtonBase,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';

import { CameraAlt } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectProfileInfoPage, {
  makeSelectCustomerName,
  makeSelectCustomerId,
  makeSelectCompanyName,
  makeSelectCreditAmount,
  makeSelectIdCard,
  makeSelectCustomerAddress,
  makeSelectIdCardIssueDate,
  makeSelectIdCardIssuePlace,
  makeSelectBankName,
  makeSelectAccountNumber,
  makeSelectAccountName,
  makeSelectListImages,
  makeSelectLoading,
} from './selectors';
import { loadDataProfile } from './actions';
import reducer from './reducer';
import saga from './saga';
import SubContent from '../SubContent/Loadable';

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
  loading,
  customerName,
  customerId,
  companyName,
  creditAmount,
  idCard,
  customerAddress,
  idCardIssueDate,
  idCardIssuePlace,
  bankName,
  accountNumber,
  accountName,
  loadProfile,
  onSubmitUpdateProfile,
}) {
  useInjectReducer({ key: 'profileInfoPage', reducer });
  useInjectSaga({ key: 'profileInfoPage', saga });
  useEffect(() => {
    console.log(loading);
    if (loading) loadProfile();
  });
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmitUpdate = data => {
    onSubmitUpdateProfile(data);
  };
  console.log('Customer Name', customerName);
  return (
    <SubContent title="Thông tin người dùng">
      <form
        id="form-profile"
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitUpdate)}
      >
        <Box pt={1.5} pr={2} component="div">
          <TextField
            id="customerName"
            name="customerName"
            label="Họ và tên"
            value={customerName}
            variant="filled"
            inputRef={register({
              required: 'Họ và tên không được để trống',
            })}
            error={!!errors.customerName}
            helperText={errors.customerName ? errors.customerName.message : ''}
          />
          <TextField
            id="customerId"
            name="customerId"
            label="Mã nhân viên"
            value={customerId}
            variant="filled"
            inputRef={register({
              required: 'Mã nhân viên không được để trống',
            })}
            error={!!errors.customerId}
            helperText={errors.customerId ? errors.customerId.message : ''}
          />
          <TextField
            id="companyName"
            name="companyName"
            label="Làm việc tại"
            value={companyName}
            variant="filled"
            inputRef={register({
              required: 'Nơi làm việc không được để trống',
            })}
            error={!!errors.companyName}
            helperText={errors.companyName ? errors.companyName.message : ''}
          />
          <TextField
            id="credit"
            name="credit"
            label="Hạn mức lương"
            value={creditAmount}
            variant="filled"
            inputRef={register({
              required: 'Hạn mức lương không được để trống',
            })}
            error={!!errors.credit}
            helperText={errors.credit ? errors.credit.message : ''}
          />
          <TextField
            id="idCard"
            name="idCard"
            label="CMND/CCCD"
            value={idCard}
            variant="filled"
            inputRef={register({
              required: 'CMND/CCCD không được để trống',
            })}
            error={!!errors.idCard}
            helperText={errors.idCard ? errors.idCard.message : ''}
          />
          <TextField
            id="address"
            name="address"
            label="Địa chỉ"
            value={customerAddress}
            variant="filled"
            inputRef={register({ required: 'Địa chỉ không được để trống' })}
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ''}
          />
          <TextField
            id="issueDate"
            name="issueDate"
            label="Ngày cấp"
            value={idCardIssueDate}
            variant="filled"
            inputRef={register({
              required: 'Ngày cấp không được để trống',
            })}
            error={!!errors.issueDate}
            helperText={errors.issueDate ? errors.issueDate.message : ''}
          />
          <TextField
            id="issuePlace"
            name="issuePlace"
            label="Nơi cấp"
            value={idCardIssuePlace}
            variant="filled"
            inputRef={register({ required: 'Nơi cấp không được để trống' })}
            error={!!errors.issuePlace}
            helperText={errors.issuePlace ? errors.issuePlace.message : ''}
          />
          <TextField
            id="bankName"
            name="bankName"
            label="Ngân hàng"
            value={bankName}
            variant="filled"
            inputRef={register({
              required: 'Ngân hàng không được để trống',
            })}
            error={!!errors.bankName}
            helperText={errors.bankName ? errors.bankName.message : ''}
          />
          <TextField
            id="accountNumber"
            name="accountNumber"
            label="Số tài khoản"
            value={accountNumber}
            variant="filled"
            inputRef={register({
              required: 'Số tài khoản không được để trống',
            })}
            error={!!errors.accountNumber}
            helperText={
              errors.accountNumber ? errors.accountNumber.message : ''
            }
          />
          <TextField
            id="accountName"
            name="accountName"
            label="Chủ tài khoản"
            value={accountName}
            variant="filled"
            inputRef={register({
              required: 'Chủ tài khoản không được để trống',
            })}
            error={!!errors.accountName}
            helperText={errors.accountName ? errors.accountName.message : ''}
          />
        </Box>
        {/* Image */}
        <List>
          <ListItem>
            <ButtonBase
              focusRipple
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(https://viknews.com/vi/wp-content/uploads/2019/04/lam-lai-cmnd5.jpg)`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  <CameraAlt />
                  <div>Chứng minh nhân dân (mặt trước)</div>
                  {/* <span>Mặt trước</span> */}
                  <input type="file" hidden />
                </Typography>
              </span>
            </ButtonBase>
          </ListItem>
          <ListItem>
            <ButtonBase
              focusRipple
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(https://cms.luatvietnam.vn/uploaded/Images/Original/2019/10/25/tay-not-ruoi-xoa-seo-co-phai-lam-lai-chung-minh-nhan-dan_2510140542.jpg)`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  <CameraAlt />
                  <div>Chứng minh nhân dân (mặt sau)</div>
                  {/* <span>Mặt trước</span> */}
                  <input type="file" hidden />
                </Typography>
              </span>
            </ButtonBase>
          </ListItem>
        </List>

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
  customerName: PropTypes.string,
  loading: PropTypes.bool,
  customerId: PropTypes.string,
  companyName: PropTypes.string,
  creditAmount: PropTypes.number,
  idCard: PropTypes.string,
  customerAddress: PropTypes.string,
  idCardIssueDate: PropTypes.string,
  idCardIssuePlace: PropTypes.string,
  bankName: PropTypes.string,
  accountNumber: PropTypes.string,
  accountName: PropTypes.string,
  onSubmitUpdateProfile: PropTypes.func,
  loadProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  profileInfoPage: makeSelectProfileInfoPage(),
  customerName: makeSelectCustomerName(),
  customerId: makeSelectCustomerId(),
  companyName: makeSelectCompanyName(),
  creditAmount: makeSelectCreditAmount(),
  idCard: makeSelectIdCard(),
  customerAddress: makeSelectCustomerAddress(),
  idCardIssueDate: makeSelectIdCardIssueDate(),
  idCardIssuePlace: makeSelectIdCardIssuePlace(),
  bankName: makeSelectBankName(),
  accountNumber: makeSelectAccountNumber(),
  accountName: makeSelectAccountName(),
  listImages: makeSelectListImages(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadProfile: () => dispatch(loadDataProfile()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileInfoPage);
