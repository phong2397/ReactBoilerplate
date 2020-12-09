/* eslint-disable no-console */
/**
 *
 * ProfileInfoPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  TextField,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Button,
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
} from './selectors';
import { updateDataProfile } from './actions';
import reducer from './reducer';
import saga from './saga';
import { tileData } from './data';
import SubContent from '../SubContent/Loadable';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  grid: {
    flexWrap: 'wrap',
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
export function ProfileInfoPage({
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
  onSubmitUpdateProfile,
}) {
  useInjectReducer({ key: 'profileInfoPage', reducer });
  useInjectSaga({ key: 'profileInfoPage', saga });

  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmitUpdate = data => {
    onSubmitUpdateProfile(data);
  };

  return (
    <SubContent title="Thông tin người dùng">
      <form
        id="form-profile"
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitUpdate)}
      >
        <div>
          <TextField
            id="customerName"
            name="customerName"
            label="Họ và tên"
            defaultValue={customerName}
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
            defaultValue={customerId}
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
            defaultValue={companyName}
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
            defaultValue={creditAmount}
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
            defaultValue={idCard}
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
            defaultValue={customerAddress}
            variant="filled"
            inputRef={register({ required: 'Địa chỉ không được để trống' })}
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ''}
          />
          <TextField
            id="issueDate"
            name="issueDate"
            label="Ngày cấp"
            defaultValue={idCardIssueDate}
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
            defaultValue={idCardIssuePlace}
            variant="filled"
            inputRef={register({ required: 'Nơi cấp không được để trống' })}
            error={!!errors.issuePlace}
            helperText={errors.issuePlace ? errors.issuePlace.message : ''}
          />
          <TextField
            id="bankName"
            name="bankName"
            label="Ngân hàng"
            defaultValue={bankName}
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
            defaultValue={accountNumber}
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
            defaultValue={accountName}
            variant="filled"
            inputRef={register({
              required: 'Chủ tài khoản không được để trống',
            })}
            error={!!errors.accountName}
            helperText={errors.accountName ? errors.accountName.message : ''}
          />

          {/* Image */}
          <GridList cols={1} rows={1}>
            {tileData.map((tile, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <GridListTile key={`grid-${index}`}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${tile.title}`}
                      className={classes.icon}
                      onClick={() => {
                        console.log(`CLICK RUN ${index}`);
                      }}
                    >
                      <CameraAlt />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.button}
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </SubContent>
  );
}

ProfileInfoPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  customerName: PropTypes.string,
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
};

const mapStateToProps = createStructuredSelector({
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
    onSubmitUpdateProfile: event => dispatch(updateDataProfile(event)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileInfoPage);
