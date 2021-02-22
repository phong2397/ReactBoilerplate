/**
 *
 * HelpButton
 *
 */

import {
  Box,
  IconButton,
  makeStyles,
  Popover,
  Typography,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));
function DetailRequest({ label, content }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const classes = useStyles();
  return (
    <Box>
      <div>
        <Typography>
          <Box component="span">{label}</Box>
          <Box component="span">
            <IconButton
              color="primary"
              aria-label="help"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              <HelpIcon />
            </IconButton>
          </Box>
        </Typography>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography} component="div">
          {content}
        </Typography>
      </Popover>
    </Box>
  );
}

DetailRequest.propTypes = {
  label: PropTypes.any,
  content: PropTypes.any,
};

export default DetailRequest;
