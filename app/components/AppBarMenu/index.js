/**
 *
 * AppBarMenu
 *
 */

import React from 'react';
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const useStyles = makeStyles({
  root: {
    width: '100%',
    minHeight: '5vh',
    position: 'fixed',
    backgroundColor: '#3cb88c',
  },
});

export function AppBarMenu() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Salary Advance</Typography>
      </Toolbar>
    </AppBar>
  );
}
