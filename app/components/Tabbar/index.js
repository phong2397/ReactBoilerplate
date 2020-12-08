/**
 *
 * Tabbar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Tabbar() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Tabbar.propTypes = {};

export default Tabbar;
