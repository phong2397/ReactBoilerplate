/**
 *
 * ModalImage
 *
 */

import React from 'react';
import { makeStyles, Modal, Backdrop } from '@material-ui/core';
import PropTypes from 'prop-types';

// import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    color: '#bdbdbd',
    outline: 'none',
    position: 'relative',
  },
  closeImg: {
    cursor: 'pointer',
    float: 'right',
    marginTop: '5px',
    width: '20px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const imgModal = {
  width: '100%',
  height: '100%',
  maxWidth: '600px',
};

function ModalImage({ open, onClose, file }) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <img src={file} style={imgModal} alt={file.name} />
      </div>
    </Modal>
  );
}

ModalImage.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  file: PropTypes.string,
};
export default ModalImage;
