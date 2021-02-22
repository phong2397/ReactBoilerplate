/**
 *
 * CompletedCustomerInfo
 *
 */

import React, { useRef, useEffect } from 'react';
import ImageDone from 'images/update-customer.png';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
// import PropTypes from 'prop-types';
import history from 'utils/history';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import useInitialfocus from 'utils/useInitialFocus';
import makeSelectCompletedCustomerInfo from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(() => ({
  img: {
    width: '100%',
    height: 'auto',
  },
  placeHolder: {
    width: '100%',
    height: '100%',
  },
  boxImage: { width: '80%', margin: '0 auto' },
}));

export function CompletedCustomerInfo() {
  const mainRef = useRef(null);
  useInitialfocus(mainRef, '');
  useEffect(() => {
    mainRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, []);
  useInjectReducer({ key: 'completedCustomerInfo', reducer });
  useInjectSaga({ key: 'completedCustomerInfo', saga });

  const classes = useStyles();
  return (
    <Box m={6} mt={3}>
      <Box className={classes.boxImage}>
        <div className={classes.placeHolder}>
          <img
            className={classes.img}
            ref={mainRef}
            src={ImageDone}
            alt="done"
          />
        </div>
        <Typography align="center" variant="h6">
          <Box m={4}>Bạn đã cập nhật thông tin cá nhân thành công</Box>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => history.push('/yeucau/danh-sach')}
            >
              Danh sách yêu cầu
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box />
    </Box>
  );
}

CompletedCustomerInfo.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  completedCustomerInfo: makeSelectCompletedCustomerInfo(),
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

export default compose(withConnect)(CompletedCustomerInfo);
