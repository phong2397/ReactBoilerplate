/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PersonIcon from '@material-ui/icons/Person';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import HistoryIcon from '@material-ui/icons/History';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { doLogout } from '../App/actions';

export function ProfilePage({ onClickSignOut }) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  return (
    <Box mt={8} p={2}>
      <List spacing={12}>
        {/* User info */}
        <ListItem button component={Link} to="/profile">
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Thông tin người dùng" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="forward">
              <ArrowForward />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
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
        <Divider />
        {/* Order history */}
        <Box m={4} />
        <ListItem button component={Link} to="/history">
          <ListItemAvatar>
            <Avatar>
              <HistoryIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Lịch sử giao dịch" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="forward">
              <ArrowForward />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        {/* end list */}
        <Box m={4} />
      </List>

      {/* Button */}
      <Box m={4} />
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={onClickSignOut}
      >
        Đăng xuất
      </Button>
    </Box>
  );
}

ProfilePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onClickSignOut: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onClickSignOut: () => dispatch(doLogout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfilePage);
