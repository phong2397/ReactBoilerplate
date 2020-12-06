/**
 *
 * LoginPage
 *
 */

import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
// import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import InputPhone from './InputPhone';
import InputOtp from './InputOtp';

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      textAlign: 'center',
    },
    backSpace: {
      position: 'fixed',
      top: theme.spacing(4),
      left: theme.spacing(4),
    },
    paper: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 0,
    },
    control: {
      position: 'fixed',
      bottom: theme.spacing(1),
      right: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(12),
    },
    mainStyle: {
      // background: "rgb(60, 184, 140)",
      background:
        'linear - gradient(90deg, rgba(60, 184, 140, 1) 0 %, rgba(44, 176, 208, 1) 75 %)',
    },
  }),
);
export function LoginPage() {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  // const changeScreen = index => {
  //   setValue(index);
  return (
    <div className={classes.paper}>
      <Switch>
        <Route exact path="/login" component={InputPhone} />
        <Route path="/login/verify" component={InputOtp} />
      </Switch>
    </div>
  );
}

// LoginPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
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

export default compose(withConnect)(LoginPage);
