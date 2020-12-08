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

import HomePage from 'containers/HomePage/Loadable';
import HistoryPage from 'containers/HistoryPage/Loadable';
import OrderDetailPage from 'containers/OrderDetailPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import ProfileInfoPage from 'containers/ProfileInfoPage/Loadable';
import DocumentPage from 'containers/DocumentPage/Loadable';
import FaqPage from 'containers/FaqPage/Loadable';
import AnswerPage from 'containers/AnswerPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#3cb88c',
    },
    primary: {
      main: '#3cb88c',
      contrastText: '#fff',
    },
    info: {
      main: '#E8E8E8',
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', 'sans-serif'].join(','),
  },
  overrides: {
    MuiTimelineItem: {
      missingOppositeContent: {
        '&:before': {
          display: 'none',
        },
      },
    },
  },
});
export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/orders/1" component={OrderDetailPage} />

          <Route path="/profile" component={ProfilePage} />
          <Route path="/profileinfo" component={ProfileInfoPage} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/documents" component={DocumentPage} />

          <Route path="/faq" component={FaqPage} />
          <Route path="/question/:id" component={AnswerPage} />
          <Route path="/features" component={FeaturePage} />

          <Route path="" component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
