/**
 *
 * OrderRepaymentStatus
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function OrderRepaymentStatus() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

OrderRepaymentStatus.propTypes = {};

export default memo(OrderRepaymentStatus);
