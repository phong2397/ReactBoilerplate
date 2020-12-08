/**
 *
 * MainLayout
 *
 */

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
import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import TabPanel from '../TabPanel';
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
function MainLayout({ homePage, profilePage, faqPage }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
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

MainLayout.propTypes = {
  homePage: PropTypes.any,
  profilePage: PropTypes.any,
  faqPage: PropTypes.any,
};

export default memo(MainLayout);
