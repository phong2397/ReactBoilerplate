/**
 *
 * SecondaryLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { KeyboardBackspaceOutlined } from '@material-ui/icons';

function SecondaryLayout({ children, title }) {
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
      <Container maxWidth="sm">{children}</Container>
    </div>
  );
}

SecondaryLayout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default SecondaryLayout;
