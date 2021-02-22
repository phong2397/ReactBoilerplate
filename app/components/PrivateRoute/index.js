import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAccessToken } from '../../utils/storage';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        getAccessToken() !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              // eslint-disable-next-line react/prop-types
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default PrivateRoute;
