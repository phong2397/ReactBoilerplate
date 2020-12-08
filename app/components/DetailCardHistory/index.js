/**
 *
 * DetailCardHistory
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function DetailCardHistory() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DetailCardHistory.propTypes = {};

export default memo(DetailCardHistory);
