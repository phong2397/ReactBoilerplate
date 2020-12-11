/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { Switch, Route } from 'react-router-dom';
import Main from 'containers/Main/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import RequestOrderPage from 'containers/RequestOrderPage/Loadable';
import HistoryPage from 'containers/HistoryPage/Loadable';
import OrderDetailPage from 'containers/OrderDetailPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import ProfileInfoPage from 'containers/ProfileInfoPage/Loadable';
import DocumentPage from 'containers/DocumentPage/Loadable';
import FaqPage from 'containers/FaqPage/Loadable';
import AnswerPage from 'containers/AnswerPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';

import GlobalStyle from '../../global-styles';

import PrivateRoute from '../../components/PrivateRoute';
const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  const mainLayout = () => (
    <Main homePage={HomePage} profilePage={ProfilePage} faqPage={FaqPage} />
  );
  // const requestOrderPage = () => (
  //   <SecondaryLayout>
  //     <RequestOrderPage />
  //   </SecondaryLayout>
  // );
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Salary Advance" defaultTitle="Salary Advance">
        <meta name="description" content="A Salary Advance application" />
      </Helmet>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={mainLayout} />
        <PrivateRoute path="/requestOrder" component={RequestOrderPage} />
        <PrivateRoute path="/profile" component={ProfileInfoPage} />
        <Route path="/history" component={HistoryPage} />
        <Route path="/orders/:id" component={OrderDetailPage} />
        {/* <Route path="/profileinfo" component={ProfileInfoPage} /> */}
        <Route path="/documents" component={DocumentPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/question/:id" component={AnswerPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
