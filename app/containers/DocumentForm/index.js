/**
 *
 * DocumentForm
 *
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Snackbar,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import DropZoneBox from 'components/DropZoneBox';
// import history from 'utils/history';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MuiAlert from '@material-ui/lab/Alert';
import makeSelectDocumentForm, {
  makeSelectError,
  makeSelectDocument,
  makeSelectLoading,
} from './selectors';
import { requestLoadDocument, submitDocument } from './actions';
import reducer from './reducer';
import saga from './saga';
import { isEmptyObject } from '../../utils/formater';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const documentsRequired = [
  {
    title: 'CMND/CCCD - 2 Mặt',
    id: 'idcard',
    name: 'idcard',
  },
  {
    title: 'Phiếu lương',
    id: 'payslip',
    name: 'payslip',
  },
  {
    title: 'Bảo hiểm y tế',
    id: 'health',
    name: 'health',
  },
];
const documentsOptional = [
  {
    title: 'Hợp đồng lao động',
    id: 'contract',
    name: 'contract',
  },
  {
    title: 'Phụ lục hợp đồng lao động',
    id: 'appendix',
    name: 'appendix',
  },
  {
    title: 'Bảng lương',
    id: 'salary',
    name: 'salary',
  },
  {
    title: 'Bảo hiểm xã hội',
    id: 'social',
    name: 'social',
  },
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function callbackPreviewImage(files) {
  return files.map(file =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    }),
  );
}
export function DocumentForm({ dispatch, documents, noticeError, loading }) {
  useInjectReducer({ key: 'documentForm', reducer });
  useInjectSaga({ key: 'documentForm', saga });
  const titleRef = useRef(null);
  const [openError, setOpenError] = React.useState(false);
  const [isChangeDocument, setIsChangeDocument] = React.useState(false);
  const [storeStateDropzone, setStoreStateDropzone] = useState({
    idcard: [],
    payslip: [],
    contract: [],
    health: [],
    appendix: [],
    salary: [],
    social: [],
  });

  const removeFile = (file, key) => () => {
    setStoreStateDropzone(prevState => ({
      ...prevState,
      [key]: prevState[key].filter(e => e !== file),
    }));
    setIsChangeDocument(true);
  };

  useEffect(() => {
    dispatch(requestLoadDocument());
    titleRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, []);

  useEffect(() => {
    if (documents && !isEmptyObject(documents)) {
      setStoreStateDropzone({
        ...storeStateDropzone,
        idcard: documents.idCard,
        payslip: documents.payslip,
        contract: documents.contract,
        health: documents.health,
        appendix: documents.appendix,
        salary: documents.salary,
        social: documents.social,
      });
    }
  }, [documents]);

  useEffect(() => {
    if (noticeError.error) {
      setOpenError(true);
    }
  }, [noticeError]);

  const onDropIdCard = useCallback(acceptedFiles => {
    setStoreStateDropzone(prevState => ({
      ...prevState,
      idcard: prevState.idcard.concat(callbackPreviewImage(acceptedFiles)),
    }));
    setIsChangeDocument(true);
  }, []);
  const onDropPayslip = useCallback(acceptedFiles => {
    setStoreStateDropzone(prevState => ({
      ...prevState,
      payslip: prevState.payslip.concat(callbackPreviewImage(acceptedFiles)),
    }));
    setIsChangeDocument(true);
  }, []);
  const onDropContract = useCallback(acceptedFiles => {
    setStoreStateDropzone(prevState => ({
      ...prevState,
      contract: prevState.contract.concat(callbackPreviewImage(acceptedFiles)),
    }));
    setIsChangeDocument(true);
  }, []);
  const onDropHealth = useCallback(acceptedFiles => {
    setStoreStateDropzone(prevState => ({
      ...prevState,
      health: prevState.health.concat(callbackPreviewImage(acceptedFiles)),
    }));
    setIsChangeDocument(true);
  }, []);
  const onDropAppendix = useCallback(acceptedFiles => {
    setStoreStateDropzone(prevState => ({
      ...prevState,
      appendix: prevState.appendix.concat(callbackPreviewImage(acceptedFiles)),
    }));
    setIsChangeDocument(true);
  }, []);
  const onDropSalary = useCallback(acceptedFiles => {
    setStoreStateDropzone(prevState => ({
      ...prevState,
      salary: prevState.salary.concat(callbackPreviewImage(acceptedFiles)),
    }));
    setIsChangeDocument(true);
  }, []);
  const onDropSocial = useCallback(acceptedFiles => {
    setStoreStateDropzone(prevState => ({
      ...prevState,
      social: prevState.social.concat(callbackPreviewImage(acceptedFiles)),
    }));
    setIsChangeDocument(true);
  }, []);

  const classes = useStyles();

  const onSubmit = () => {
    const data = {
      imgsIdCard: storeStateDropzone.idcard,
      imgsPayslip: storeStateDropzone.payslip,
      imgsCont: storeStateDropzone.contract,
      imgsHealth: storeStateDropzone.health,
      imgsAppx: storeStateDropzone.appendix,
      imgsSalary: storeStateDropzone.salary,
      imgsSocial: storeStateDropzone.social,
    };
    dispatch(submitDocument({ data, isChangeDocument }));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };
  const handleOnDrop = {
    idcard: onDropIdCard,
    payslip: onDropPayslip,
    contract: onDropContract,
    health: onDropHealth,
    appendix: onDropAppendix,
    salary: onDropSalary,
    social: onDropSocial,
  };
  // const handleRemoveFile = {
  //   idcard: removeIdCard,
  //   payslip: removePayslip,
  //   contract: removeContract,
  //   health: removeHealth,
  //   appendix: removeAppendix,
  //   salary: removeSalary,
  //   social: removeSocial,
  // };

  return (
    <Paper elevation={3} variant="outlined" square>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        <Box ref={titleRef} mt={3} fontWeight="fontWeightBold">
          Chọn tài liệu
        </Box>
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <Box my={3}>
          <Typography component="span">
            <Box fontSize={20} fontWeight="fontWeightBold">
              Tài liệu bắt buộc
            </Box>
            <Box fontSize={16}>
              Cung cấp giấy tờ giúp tăng khả năng duyệt yêu cầu
            </Box>
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {documentsRequired.map(doc => (
            <Grid item xs={12} md={6} key={doc.id}>
              <div>
                <Typography component="span" align="center">
                  <Box>{doc.title}</Box>
                </Typography>
              </div>
              <DropZoneBox
                type="file"
                id={doc.id}
                name={doc.name}
                onDrop={handleOnDrop[doc.id]}
                accept="image/*"
                files={storeStateDropzone[doc.id]}
                removeFile={removeFile}
                docId={doc.id}
              />
            </Grid>
          ))}
        </Grid>
        <Box my={5}>
          <Typography component="span">
            <Box fontSize={20} fontWeight="fontWeightBold">
              Tài liệu bổ sung
            </Box>
            <Box fontSize={16}>
              Cung cấp giấy tờ giúp tăng khả năng duyệt yêu cầu
            </Box>
          </Typography>
        </Box>
        <Grid container spacing={5}>
          {documentsOptional.map(doc => (
            <Grid item xs={12} md={6} key={doc.id}>
              <div>
                <Typography component="span" align="center">
                  <Box>{doc.title}</Box>
                </Typography>
              </div>
              <DropZoneBox
                type="file"
                id={doc.id}
                name={doc.name}
                onDrop={handleOnDrop[doc.id]}
                accept="image/*"
                docId={doc.id}
                files={storeStateDropzone[doc.id]}
                removeFile={removeFile}
              />
            </Grid>
          ))}
        </Grid>
      </form>
      <Box m={4}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={onSubmit}
        >
          Tiếp tục
        </Button>
      </Box>
      <Snackbar open={openError} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {noticeError.errorMsg}
        </Alert>
      </Snackbar>
      <Backdrop
        className={classes.backdrop}
        transitionDuration={500}
        open={loading}
      >
        {/* {<CircularProgress />} */}
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}

DocumentForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  documents: PropTypes.object,
  noticeError: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  documentForm: makeSelectDocumentForm(),
  documents: makeSelectDocument(),
  noticeError: makeSelectError(),
  loading: makeSelectLoading(),
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

export default compose(withConnect)(DocumentForm);
