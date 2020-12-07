/**
 *
 * ListDocument
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ListDocument() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ListDocument.propTypes = {};

export default memo(ListDocument);
