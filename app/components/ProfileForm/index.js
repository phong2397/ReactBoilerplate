/**
 *
 * ProfileForm
 *
 */

import React, { memo } from 'react';
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

import PropTypes from 'prop-types';

const tileData = [
  {
    img: 'https://viknews.com/vi/wp-content/uploads/2019/04/lam-lai-cmnd5.jpg',
    title: 'Chững minh nhân dân (mặt trước)',
    author: 'author',
  },
  {
    img:
      'https://cms.luatvietnam.vn/uploaded/Images/Original/2019/10/25/tay-not-ruoi-xoa-seo-co-phai-lam-lai-chung-minh-nhan-dan_2510140542.jpg',
    title: 'Chững minh nhân dân (mặt sau)',
    author: 'author 2',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
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

function ProfileForm({
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
}) {
  const classes = useStyles();

  const { register, handleSubmit } = useForm(); // initialize the hook
  const onSubmit = data => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div>
      <form
        id="form-profile"
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <TextField
            id="customer-name"
            name="customer-name"
            label="Họ và tên"
            defaultValue={customerName}
            variant="filled"
            inputRef={register({ required: true })}
          />

          <TextField
            id="customer-id"
            name="customer-id"
            label="Mã nhân viên"
            defaultValue={customerId}
            variant="filled"
            inputRef={register({ required: true })}
          />
          <TextField
            id="company-name"
            name="company-name"
            label="Làm việc tại"
            defaultValue={companyName}
            variant="filled"
            inputRef={register({ required: true })}
          />
          <TextField
            id="credit"
            name="credit"
            label="Hạn mức lương"
            defaultValue={creditAmount}
            variant="filled"
            inputRef={register({ required: true })}
          />
          <TextField
            id="id-card"
            name="id-card"
            label="CMND/CCCD"
            defaultValue={idCard}
            variant="filled"
            inputRef={register({ required: true })}
          />
          <TextField
            id="address"
            name="address"
            label="Địa chỉ"
            defaultValue={customerAddress}
            variant="filled"
            inputRef={register({ required: true })}
          />
          <TextField
            id="issue-date"
            name="issue-date"
            label="Ngày cấp"
            defaultValue={idCardIssueDate}
            variant="filled"
            inputRef={register({ required: true })}
          />
          <TextField
            id="issue-place"
            name="issue-place"
            label="Nơi cấp"
            defaultValue={idCardIssuePlace}
            variant="filled"
            inputRef={register({ required: true })}
          />
          <TextField
            id="bank-name"
            name="bank-name"
            label="Ngân hàng"
            defaultValue={bankName}
            variant="filled"
            inputRef={register({ required: true })}
          />
          <TextField
            id="account-number"
            name="account-number"
            label="Số tài khoản"
            defaultValue={accountNumber}
            variant="filled"
            inputRef={register({ required: true })}
          />
          <TextField
            id="account-name"
            name="account-name"
            label="Chủ tài khoản"
            defaultValue={accountName}
            variant="filled"
            inputRef={register({ required: true })}
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
            fullWidth
            onClick={onSubmit}
            className={classes.button}
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
}

ProfileForm.propTypes = {
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
};

export default memo(ProfileForm);
