/**
 *
 * TabPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
// import styled from 'styled-components';

function TabPanel({ value, index, children, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.any,
};

export default TabPanel;
