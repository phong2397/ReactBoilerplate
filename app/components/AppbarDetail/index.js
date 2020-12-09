/**
 *
 * AppBarDetail
 *
 */

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import KeyboardBackspaceIcon from '@material-ui/icons';
// import styled from 'styled-components';
// function convertToTitle(pathname) {
//   switch (pathname) {
//     case '/profile/update':
//       return 'Thông tin người dùng';
//     case '/profile/documents':
//       return 'Danh sách tài liệu';
//     case '/profile/history':
//       return 'Lịch sử giao dịch';
//     case '/faq/question/':
//       return 'Câu hỏi';
//     case '/verify':
//       return 'Yêu cầu ứng lương';
//     case '/orders/detail/1':
//       return 'Chi tiết giao dịch';
//     default:
//       break;
//   }
//   return '';
// }
function AppBarDetail({ title }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => console.log('Test')}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
        <Typography variant="h6">
          {title}
          {/* {convertToTitle(this.props.location.pathname)} */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

AppBarDetail.propTypes = {
  title: PropTypes.string,
};

export default memo(AppBarDetail);
