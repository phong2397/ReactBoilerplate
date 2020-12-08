/**
 *
 * ModalSuccess
 *
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Modal from '@material-ui/core/Modal';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
const useStyles = makeStyles(theme => ({
  paper: {
    color: 'white',
    position: 'absolute',
    width: '100%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export function ModalSuccess() {
  const history = useHistory();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    history.push('/');
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex" justifyContent="center">
        <Box p={1}>
          <CheckCircleOutlineIcon style={{ fontSize: 80 }} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Box p={2}>
          <Typography variant="h5" align="center">
            Chúc mừng bạn đã gửi yêu cầu thành công
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Box p={1}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </div>
  );

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Yêu cầu ứng lương
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

// ModalSuccess.propTypes = {};

// export default ModalSuccess;
