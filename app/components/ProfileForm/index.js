/**
 *
 * ProfileForm
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, GridList, GridListTile, GridListTileBar, IconButton, CameraAlt} from '@material-ui/core';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const tileData = [
  {
    img: "https://viknews.com/vi/wp-content/uploads/2019/04/lam-lai-cmnd5.jpg",
    title: "Chững minh nhân dân (mặt trước)",
    author: "author",
  },
  {
    img: "https://cms.luatvietnam.vn/uploaded/Images/Original/2019/10/25/tay-not-ruoi-xoa-seo-co-phai-lam-lai-chung-minh-nhan-dan_2510140542.jpg",
    title: "Chững minh nhân dân (mặt sau)",
    author: "author 2",
  },
];

function ProfileForm(props) {
  return (
    <div>
      {/* <FormattedMessage {...messages.header} /> */}
      <form noValidate autoComplete="off">
        <div>
          <TextField
            id="customer-name"
            label="Họ và tên"
            defaultValue={props.customerName}
            variant="filled"
          />
          <TextField
            id="customer-id"
            label="Mã nhân viên"
            defaultValue={props.customerId}
            variant="filled"
          />
          <TextField
            id="company-name"
            label="Làm việc tại"
            defaultValue={props.companyName}
            variant="filled"
          />
          <TextField
            id="credit"
            label="Hạn mức lương"
            defaultValue={props.creditAmount}
            variant="filled"
          />
          <TextField
            id="id-card"
            label="Chứng minh nhân dân/Căn cước công dân"
            defaultValue={props.idCard}
            variant="filled"
          />
          <TextField
            id="address"
            label="Địa chỉ"
            defaultValue={props.customerAddress}
            variant="filled"
          />
          <TextField
            id="issue-date"
            label="Ngày cấp"
            defaultValue={props.idCardIssueDate}
            variant="filled"
          />
          <TextField
            id="issue-place"
            label="Nơi cấp"
            defaultValue={props.idCardIssuePlace}
            variant="filled"
          />
          <TextField
            id="bank-name"
            label="Ngân hàng"
            defaultValue={props.bankName}
            variant="filled"
          />
          <TextField
            id="account-number"
            label="Số tài khoản"
            defaultValue={props.accountNumber}
            variant="filled"
          />
          <TextField
            id="account-name"
            label="Chủ tài khoản"
            defaultValue={props.accountName}
            variant="filled"
          />

          {/* Image */}
          <GridList cols={1} rows={1}>
            {tileData.map((tile, index) => (
              <GridListTile key={index}>
                {/* <img src={tile.img} alt={tile.title} /> */}
                <GridListTileBar
                  title={tile.title}
                  // actionIcon={
                  //   <IconButton aria-label={`info about ${tile.title}`} >
                  //     <CameraAlt />
                  //   </IconButton>
                  // }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </form>
    
    </div>
  );
}

ProfileForm.propTypes = {};

export default memo(ProfileForm);
