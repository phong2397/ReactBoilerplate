/**
 *
 * CircularProgressWithLabel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from '@material-ui/core';
function CircularProgressWithLabel({ progress, handleClickResend }) {
  return (
    <Box display="flex" justifyContent="center">
      <Box m={1}>
        {progress > 0 ? (
          <Link
            href="#resendOtp"
            color="inherit"
            variant="body2"
            style={{
              pointerEvents: 'none',
              cursor: 'default',
              textDecoration: 'none',
              color: 'black',
            }}
          >
            Bạn còn
          </Link>
        ) : (
          <Link href="#resendOtp" onClick={handleClickResend} variant="body2">
            Gửi lại mã
          </Link>
        )}
      </Box>
      <Box position="relative" display="inline-flex" p={2}>
        {/* <CircularProgress variant="determinate" value={progress} /> */}
        {progress > 0 && (
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="body2"
              style={{
                pointerEvents: 'none',
                cursor: 'default',
                textDecoration: 'none',
                // color: 'red',
              }}
              component="div"
              color="primary"
            >{`${Math.round((progress * 60) / 100)}s`}</Typography>
          </Box>
        )}
      </Box>
      <Box m={1}>
        {progress > 0 && (
          <Link
            href="#resendOtp"
            color="inherit"
            variant="body2"
            style={{
              pointerEvents: 'none',
              cursor: 'default',
              textDecoration: 'none',
              color: 'black',
            }}
          >
            để nhập mã OTP
          </Link>
        )}
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  progress: PropTypes.number.isRequired,
  handleClickResend: PropTypes.func,
};
export default CircularProgressWithLabel;
