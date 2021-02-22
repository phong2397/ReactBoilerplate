/**
 *
 * HomePage
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

import { Redirect, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import CustomStepper from 'components/CustomStepper';
import Footer from 'components/Footer';
import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import IntroduceBox from 'components/IntroduceBox';
import DocumentForm from 'containers/DocumentForm/Loadable';
import ConfirmPage from 'containers/ConfirmPage/Loadable';
import CompletedOrder from 'containers/CompletedOrder/Loadable';
import CompletedCustomerInfo from 'containers/CompletedCustomerInfo/Loadable';
import HistoryPage from 'containers/HistoryPage/Loadable';
import OrderDetailPage from 'containers/OrderDetailPage/Loadable';
import IntroducePage from 'containers/IntroducePage/Loadable';
import TutorialPage from 'containers/TutorialPage/Loadable';
import FaqPage from 'containers/FaqPage/Loadable';
import OrderForm from 'containers/OrderForm/Loadable';
import BasicInfoForm from 'containers/BasicInfoForm/Loadable';
import makeSelectHomePage, {
  makeSelectActiveStep,
  makeSelectProfileName,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeActiveStep, loadBasicInfo } from './actions';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    // maxWidth: 'calc(768px + 16px * 2)',
    margin: '0 auto',
    marginTop: theme.spacing(2),
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  grow: {
    flexGrow: 1,
  },
  stepper: { backgroundColor: 'transparent' },
}));
function getSteps() {
  return ['Thông tin cơ bản', 'Bổ sung tài liệu', 'Chọn mức ứng', 'Xác nhận'];
}
function convertPathToStep(path) {
  switch (path) {
    case '/yeucau/thong-tin-co-ban':
      return 0;
    case '/yeucau/tai-lieu':
      return 1;
    case '/yeucau/chon-muc-ung':
      return 2;
    case '/yeucau/chi-tiet':
      return 3;
    default:
      return -1;
  }
}
export function HomePage({ dispatch, activeStep, profileName }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const classes = useStyles();
  const steps = getSteps();
  useEffect(() => {
    dispatch(changeActiveStep(convertPathToStep(history.location.pathname)));
  });
  useEffect(() => {
    dispatch(loadBasicInfo());
  }, []);
  return (
    <React.Fragment>
      <Header name={profileName} />

      <main className={classes.root}>
        <Container maxWidth="md">
          {activeStep !== -1 && (
            <CustomStepper steps={steps} activeStep={activeStep} />
          )}
        </Container>
      </main>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.heroContent}>
              <Switch>
                <PrivateRoute exact path="/yeucau">
                  <Redirect to="/yeucau/thong-tin-co-ban" />
                </PrivateRoute>
                <PrivateRoute
                  path="/yeucau/thong-tin-co-ban"
                  component={BasicInfoForm}
                />

                <PrivateRoute
                  path="/yeucau/tai-lieu"
                  component={DocumentForm}
                />
                <PrivateRoute
                  exact
                  path="/yeucau/chon-muc-ung"
                  component={OrderForm}
                />
                <PrivateRoute
                  exact
                  path="/yeucau/hoan-thanh-cap-nhat"
                  component={CompletedCustomerInfo}
                />
                <PrivateRoute path="/yeucau/chi-tiet" component={ConfirmPage} />
                <PrivateRoute
                  path="/yeucau/hoan-thanh"
                  component={CompletedOrder}
                />
                <PrivateRoute
                  path="/yeucau/danh-sach"
                  component={HistoryPage}
                />
                <PrivateRoute
                  path="/yeucau/don-yeu-cau/:id"
                  component={OrderDetailPage}
                />
                <PrivateRoute
                  path="/yeucau/gioi-thieu"
                  component={IntroducePage}
                />
                <PrivateRoute
                  path="/yeucau/huong-dan"
                  component={TutorialPage}
                />
                <PrivateRoute path="/yeucau/hoi-dap" component={FaqPage} />
                <PrivateRoute>
                  <Redirect to="/yeucau/" />
                </PrivateRoute>
              </Switch>
            </div>
          </Grid>
          <Grid item xs={12}>
            <IntroduceBox />
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeStep: PropTypes.number,
  profileName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  activeStep: makeSelectActiveStep(),
  profileName: makeSelectProfileName(),
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

export default compose(withConnect)(HomePage);
