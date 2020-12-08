/**
 *
 * Profile
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Profile() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Profile.propTypes = {};

export default Profile;
