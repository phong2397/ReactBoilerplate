/**
 *
 * BackDropLoading
 *
 */

import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
function BackDropLoading() {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} transitionDuration={500} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

BackDropLoading.propTypes = {};

export default BackDropLoading;
