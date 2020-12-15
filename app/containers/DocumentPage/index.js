/* eslint-disable indent */
/**
 *
 * DocumentPage
 *
 */

import React, { memo, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  List,
  ListItem,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Controller, useForm } from 'react-hook-form';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Document from 'components/Document';

import makeSelectDocumentPage, {
  makeSelectDescription,
  makeSelectDocuments,
  makeSelectFileDocument,
  makeSelectFilter,
  makeSelectLoadingDocument,
  makeSelectOpenFormUpload,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import SubContent from '../SubContent/Loadable';
import {
  changeDescription,
  changeTypeDocument,
  closeFormUpload,
  requestloadDocument,
  onChangeFile,
  openFormUpload,
  submitDocumentUpload,
  changeFiler,
} from './actions';
const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  modal: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    spacing: theme.spacing(1),
    padding: theme.spacing(2, 4, 3),
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    bottom: 'auto',
    top: theme.spacing(8),
  },
  grow: {
    flexGrow: 1,
  },
  buttonUpload: {
    left: 0,
  },
  input: {
    display: 'none',
  },
}));
// const convertCategoryId = id => {
//   switch (id) {
//     case 0:
//       break;
//     case 1:
//       break;
//     case 2:
//       break;
//     case 3:
//       break;
//     default:
//       break;
//   }
// };
export function DocumentPage({
  loading,
  documents,
  file,
  filter,
  requestLoadDocument,
  openForm,
  handleCloseFormUpload,
  handleOpenFormUpload,
  handleImageChange,
  handleSubmitDocument,
  handleChangeFilter,
}) {
  useInjectReducer({ key: 'documentPage', reducer });
  useInjectSaga({ key: 'documentPage', saga });
  useEffect(() => {
    if (loading) {
      requestLoadDocument();
    }
  });
  const { register, errors, handleSubmit, control } = useForm();
  const onSubmit = data => {
    const { documentType, description } = data;

    handleSubmitDocument({ documentType, description, file });
  };
  const classes = useStyles();
  const body = (
    <div className={classes.modal}>
      <Typography variant="h5" gutterBottom>
        Tài liệu
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.root}
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <InputLabel id="select-type-document">Chọn tài liệu</InputLabel>
            <Controller
              as={
                <Select
                  name="documentType"
                  labelId="select-type-document"
                  required
                  id="select-type"
                  defaultValue={1}
                  fullWidth
                >
                  <MenuItem value={1}>CMND/CCCD</MenuItem>
                  <MenuItem value={2}>BHYT/BHXH</MenuItem>
                  <MenuItem value={3}>GPLX</MenuItem>
                  <MenuItem value={4}>HDLD</MenuItem>
                  <MenuItem value={0}>Giấy tờ khác</MenuItem>
                </Select>
              }
              inputRef={register}
              rules={{ required: 'Phải chọn loại tài liệu' }}
              defaultValue={1}
              name="documentType"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-required"
              label="Mô tả"
              name="description"
              defaultValue=""
              inputRef={register}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              render={() => (
                <input
                  id="contained-button-file"
                  className={classes.input}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              )}
              defaultValue={{}}
              inputRef={register}
              name="documentFile"
              rules={{ required: 'Không tìm thấy tài liệu' }}
            />
            <label htmlFor="contained-button-file">
              <FormHelperText error={!!errors.documentFile}>
                {errors.documentFile ? errors.documentFile.message : ''}
              </FormHelperText>
              <Button
                variant="contained"
                color="default"
                component="span"
                fullWidth
              >
                {file.name ? file.name : 'Chọn ảnh tải lên'}
              </Button>
            </label>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Lưu
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseFormUpload}
              fullWidth
            >
              Đóng
            </Button>
          </Grid>
        </Grid>
        <Box m={1} p={1} />
      </form>
    </div>
  );
  return (
    <SubContent title="Danh sách tài liệu">
      <Box pt={16}>
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Toolbar>
            <div className={classes.grow}>
              <InputLabel id="select-filter-document">Chọn tài liệu</InputLabel>
              <Select
                labelId="select-filter-document"
                required
                id="select-type-document"
                fullWidth
                defaultValue={-1}
                onChange={handleChangeFilter}
              >
                <MenuItem value={1}>CMND/CCCD</MenuItem>
                <MenuItem value={2}>BHYT/BHXH</MenuItem>
                <MenuItem value={3}>GPLX</MenuItem>
                <MenuItem value={4}>HDLD</MenuItem>
                <MenuItem value={0}>Giấy tờ khác</MenuItem>
                <MenuItem value={-1}>Tất cả</MenuItem>
              </Select>
            </div>
            <div className={classes.grow} />

            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenFormUpload}
            >
              Tải lên
            </Button>
            <Modal
              disableBackdropClick
              open={openForm}
              onClose={handleCloseFormUpload}
              aria-labelledby="form-upload-modal-title"
              aria-describedby="form-upload-modal-description"
            >
              {body}
            </Modal>
          </Toolbar>
        </AppBar>
        <List>
          {filter === -1
            ? documents.map(document => (
                <ListItem key={document.fileName}>
                  <Document
                    fileName={document.fileName}
                    img={document.img}
                    description={document.description}
                    documentType={document.categoryId}
                  />
                </ListItem>
              ))
            : documents
                .filter(document => document.categoryId === filter)
                .map(document => (
                  <ListItem key={document.fileName}>
                    <Document
                      fileName={document.fileName}
                      img={document.img}
                      description={document.description}
                      documentType={document.categoryId}
                    />
                  </ListItem>
                ))}
        </List>
      </Box>
    </SubContent>
  );
}

DocumentPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  requestLoadDocument: PropTypes.func,
  documents: PropTypes.array,
  openForm: PropTypes.bool,
  handleCloseFormUpload: PropTypes.func,
  handleOpenFormUpload: PropTypes.func,
  handleImageChange: PropTypes.func,
  file: PropTypes.object,
  handleSubmitDocument: PropTypes.func,
  handleChangeFilter: PropTypes.func,
  filter: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoadingDocument(),
  documentPage: makeSelectDocumentPage(),
  documents: makeSelectDocuments(),
  openForm: makeSelectOpenFormUpload(),
  file: makeSelectFileDocument(),
  description: makeSelectDescription(),
  filter: makeSelectFilter(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    requestLoadDocument: () => dispatch(requestloadDocument()),
    handleCloseFormUpload: () => dispatch(closeFormUpload()),
    handleOpenFormUpload: () => dispatch(openFormUpload()),
    handleTypeDocument: evt => dispatch(changeTypeDocument(evt.target.value)),
    handleChangeDesc: evt => dispatch(changeDescription(evt.target.value)),
    handleImageChange: evt => {
      const file = evt.target.files[0];
      dispatch(onChangeFile(file));
    },
    handleChangeFilter: evt => dispatch(changeFiler(evt.target.value)),
    handleSubmitDocument: ({ documentType, description, file }) =>
      dispatch(submitDocumentUpload({ documentType, description, file })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DocumentPage);
