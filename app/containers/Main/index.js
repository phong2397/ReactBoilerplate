/**
 *
 * Main
 *
 */

import React, { memo } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  makeStyles,
} from '@material-ui/core';
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
import makeSelectMain, { makeSelectValue } from './selectors';
import reducer from './reducer';
import saga from './saga';
import TabPanel from '../../components/TabPanel';
import { AppBarMenu } from '../../components/AppBarMenu';
import { changeTab } from './actions';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: '#3cb88c',
    },
    actionItem: {
      '&$selected': {
        color: '#fff',
      },
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
export function Main({ homePage, profilePage, faqPage, value, handleChange }) {
  useInjectReducer({ key: 'main', reducer });
  useInjectSaga({ key: 'main', saga });
  const classes = useStyles();
  return (
    <div>
      <AppBarMenu />
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
      <BottomNavigation
        showLabels
        className={classes.root}
        value={value}
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
    </div>
  );
}

Main.propTypes = {
  homePage: PropTypes.any,
  profilePage: PropTypes.any,
  faqPage: PropTypes.any,
  value: PropTypes.number,
  handleChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  main: makeSelectMain(),
  value: makeSelectValue(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleChange: (evt, newValue) => dispatch(changeTab(newValue)),
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
