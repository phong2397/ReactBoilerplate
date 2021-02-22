/**
 *
 * DropZoneBox
 *
 */

import { makeStyles, Grid, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import ModalImage from 'components/ModalImage';
// import styled from 'styled-components'
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
  buttonDelete: {
    position: 'absolute',
    color: '#5c5c5c',
    fontSize: 20,
    zIndex: 1,
    top: 20,
    right: 22,
  },
  thumbInner: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    left: 0,
    top: 0,
  },
  img: {
    width: '100%',
    height: '100%',
  },
}));

function DropZoneBox({ onDrop, accept, files, removeFile, docId }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  const [listImage, setListImage] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState('');
  const handleOpen = image => {
    setImgSrc(image);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setListImage(files);
  }, [files]);
  const classes = useStyles();
  const thumbs = listImage.map(file => {
    if (file.preview) {
      return (
        <Grid item xs={6} md={4} key={uuidv4()}>
          <div className={classes.thumbInner}>
            <CloseIcon
              type="button"
              className={classes.buttonDelete}
              onClick={removeFile(file, docId)}
            />
            <div style={{ padding: '15px' }}>
              <Button onClick={() => handleOpen(file.preview)}>
                <img
                  src={file.preview}
                  className={classes.img}
                  alt={file.name}
                />
              </Button>
            </div>
          </div>
        </Grid>
      );
    }
    return <div key={uuidv4()} />;
  });

  return (
    <div className="container">
      <div className={classes.root} {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudUploadIcon />
        <div>Kéo thả hoặc bấm vào đây để chọn file</div>
      </div>
      <Grid container spacing={1}>
        {thumbs}
      </Grid>
      <ModalImage open={open} onClose={handleClose} file={imgSrc} />
    </div>
  );
}
DropZoneBox.propTypes = {
  onDrop: PropTypes.any,
  accept: PropTypes.any,
  files: PropTypes.array,
  removeFile: PropTypes.any,
  docId: PropTypes.string,
};

export default DropZoneBox;
