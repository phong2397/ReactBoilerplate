/**
 *
 * ProfileInfoPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ProfileForm from 'components/ProfileForm';
import makeSelectProfileInfoPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ProfileInfoPage() {
  useInjectReducer({ key: 'profileInfoPage', reducer });
  useInjectSaga({ key: 'profileInfoPage', saga });

  return (
    <div>
      {/* <FormattedMessage {...messages.header} /> */}
      <h1>OK</h1>
      <ProfileForm></ProfileForm>
    </div>
  );
}

ProfileInfoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profileInfoPage: makeSelectProfileInfoPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileInfoPage);
