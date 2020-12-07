/**
 *
 * AppbarDetail
 *
 */

import React, { Component } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { withStyles } from '@material-ui/styles';

import { withRouter } from 'react-router-dom';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function convertToTitle(pathname) {
  switch (pathname) {
    case '/profile/update':
      return 'Thông tin người dùng';
    case '/profile/documents':
      return 'Danh sách tài liệu';
    case '/profile/history':
      return 'Lịch sử giao dịch';
    case '/faq/question/':
      return 'Câu hỏi';
    case '/verify':
      return 'Yêu cầu ứng lương';
    case '/orders/detail/1':
      return 'Chi tiết giao dịch';
    default:
      break;
  }
  return '';
}

class AppBarDetail extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.goBack}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography variant="h6">
            {convertToTitle(this.props.location.pathname)}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
export default withStyles(styles)(withRouter(AppBarDetail));
