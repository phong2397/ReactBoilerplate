/**
 *
 * SubContent
 *
 */

import React from 'react';
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { KeyboardBackspaceOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSubContent from './selectors';
import { goBackAction } from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '60vh',
  },
}));
export function SubContent({ title, children, handleBack }) {
  useInjectReducer({ key: 'subContent', reducer });
  useInjectSaga({ key: 'subContent', saga });
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleBack}
          >
            <KeyboardBackspaceOutlined />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      {/* <AppbarDetail title="Test" /> */}
      <div className={classes.root}>{children}</div>
    </div>
  );
}

SubContent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  handleBack: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  subContent: makeSelectSubContent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleBack: () => dispatch(goBackAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SubContent);
