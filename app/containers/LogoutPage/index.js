/**
 *
 * LogoutPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import makeSelectLogoutPage from './selectors';
import saga from './saga';
import { logoutAction } from './actions';

export function LogoutPage({ dispatch }) {
  useInjectSaga({ key: 'logoutPage', saga });
  useEffect(() => {
    dispatch(logoutAction());
  }, []);

  return <div />;
}

LogoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  logoutPage: makeSelectLogoutPage(),
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

export default compose(withConnect)(LogoutPage);
