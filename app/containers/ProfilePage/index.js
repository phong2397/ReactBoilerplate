/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import FolderIcon from "@material-ui/icons/Folder"
import ArrowForward from "@material-ui/icons/ArrowForwardIos"

import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ProfilePage() {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  return (
    <div>
      <List spacing={12}>
        {/* User info */}
        <ListItem button component={Link} to="/profileinfo">
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />  
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Thông tin người dùng" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="forward">
              <ArrowForward />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        {/* User document */}
        <Box m={4} />
        <ListItem button component={Link} to="/documents">
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Danh sách tài liệu" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="forward">
              <ArrowForward />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        {/* Order history */}
        <Box m={4} />
        <ListItem button component={Link} to="/history">
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Lịch sử giao dịch" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="forward">
              <ArrowForward />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        {/* end list */}
        <Box m={4} />
      </List>

      {/* Button */}
      <Box m={4} />
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        // onClick={}
      >
        Đăng xuất
      </Button>
    </div>
  );
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfilePage);
