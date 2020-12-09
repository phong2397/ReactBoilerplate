/**
 *
 * AppBarDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import KeyboardBackspaceIcon from '@material-ui/icons';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
// import styled from 'styled-components';

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
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}

AppBarDetail.propTypes = {
  title: PropTypes.string,
};

export default AppBarDetail;
