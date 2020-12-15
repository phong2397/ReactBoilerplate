/**
 *
 * Main
 *
 */

import React, { memo, useEffect } from 'react';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AccountCircleOutlined,
  AttachMoney,
  EventOutlined,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMain, {
  makeSelectLoading,
  makeSelectValue,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import TabPanel from '../../components/TabPanel';

import { changeTab, loadProfile } from './actions';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: '#3cb88c',
    },
    actionItem: {
      '&$selected': {
        color: '#fff',
      },
    },
    stickToBottom: {
      width: '100%',
      backgroundColor: '#3cb88c',
    },
    selected: {},
  }),
);
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export function Main({
  homePage,
  profilePage,
  faqPage,
  value,
  handleChange,
  loading,
  requestLoadProfile,
}) {
  useInjectReducer({ key: 'main', reducer });
  useInjectSaga({ key: 'main', saga });
  useEffect(() => {
    console.log('LOAD PROFILE');
    if (loading) requestLoadProfile();
  });
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Salary Advance</Typography>
        </Toolbar>
      </AppBar>
      <div>
        <TabPanel value={value} index={0}>
          {homePage}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {profilePage}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {faqPage}
        </TabPanel>
      </div>
      <AppBar
        position="fixed"
        color="primary"
        style={{ top: 'auto', bottom: 0 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          className={classes.stickToBottom}
          onChange={handleChange}
        >
          <BottomNavigationAction
            classes={{
              root: classes.actionItem,
              selected: classes.selected,
            }}
            label="Yêu cầu"
            icon={<AttachMoney />}
            {...a11yProps(0)}
          />

          <BottomNavigationAction
            classes={{
              root: classes.actionItem,
              selected: classes.selected,
            }}
            label="Hồ sơ"
            icon={<AccountCircleOutlined />}
            {...a11yProps(1)}
          />
          <BottomNavigationAction
            classes={{
              root: classes.actionItem,
              selected: classes.selected,
            }}
            label="Câu Hỏi"
            icon={<EventOutlined />}
            {...a11yProps(2)}
          />
        </BottomNavigation>
      </AppBar>
    </div>
  );
}

Main.propTypes = {
  homePage: PropTypes.any,
  profilePage: PropTypes.any,
  faqPage: PropTypes.any,
  value: PropTypes.number,
  handleChange: PropTypes.func,
  loading: PropTypes.bool,
  requestLoadProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  main: makeSelectMain(),
  value: makeSelectValue(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleChange: (evt, newValue) => dispatch(changeTab(newValue)),
    requestLoadProfile: () => dispatch(loadProfile()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Main);
