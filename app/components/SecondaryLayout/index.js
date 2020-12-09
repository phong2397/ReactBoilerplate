/**
 *
 * SecondaryLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { KeyboardBackspaceOutlined } from '@material-ui/icons';
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '60vh',
  },
}));

function SecondaryLayout({ children, title }) {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => console.log('Test')}
          >
            <KeyboardBackspaceOutlined />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      {/* <AppbarDetail title="Test" /> */}
      <div className={classes.root}>{children}</div>
    </div>
  );
}

SecondaryLayout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default SecondaryLayout;
