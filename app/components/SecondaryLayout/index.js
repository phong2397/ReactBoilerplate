/**
 *
 * SecondaryLayout
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@material-ui/core';

import AppbarDetail from '../AppBarDetail';
function SecondaryLayout({ children }) {
  return (
    <div>
      <AppbarDetail title="Test" />
      <Box m={10} />
      <Container maxWidth="sm">{children}</Container>
    </div>
  );
}

SecondaryLayout.propTypes = {
  children: PropTypes.any,
};

export default memo(SecondaryLayout);
