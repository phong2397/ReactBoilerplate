/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

// import React from 'react';
import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import LogoutPage from 'containers/LogoutPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivateRoute from 'components/PrivateRoute';
import GlobalStyle from '../../global-styles';
export default function App() {
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', () => {
      window.history.forward();
    });
  }, []);

  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/">
          <Redirect to="/yeucau" />
        </PrivateRoute>
        <PrivateRoute path="/yeucau" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
