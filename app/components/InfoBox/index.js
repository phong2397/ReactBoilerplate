/**
 *
 * InfoBox
 *
 */

import { Card, CardContent, makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyles = makeStyles({
  root: {
    boxShadow: 'none',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function InfoBox({ content }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>{content}</CardContent>
    </Card>
  );
}

InfoBox.propTypes = {
  content: PropTypes.any,
};

export default InfoBox;
