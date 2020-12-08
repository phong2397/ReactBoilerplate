/**
 *
 * UploadImage
 *
 */

import React, { memo } from 'react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function UploadImage() {
  return (
    <div>
      <Box pt={3}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography variant="h6" gutterBottom>
              Danh sách tài liệu
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary">
              Tải lên
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

UploadImage.propTypes = {};

export default memo(UploadImage);
