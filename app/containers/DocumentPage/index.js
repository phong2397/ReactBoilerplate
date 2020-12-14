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
  List,
  ListItem,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Document from 'components/Document';

import makeSelectDocumentPage, {
  makeSelectDocuments,
  makeSelectLoadingDocument,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import SubContent from '../SubContent/Loadable';
import { loadDocument } from './actions';
const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
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
export function DocumentPage({ loading, documents, requestLoadDocument }) {
  useInjectReducer({ key: 'documentPage', reducer });
  useInjectSaga({ key: 'documentPage', saga });
  useEffect(() => {
    if (loading) {
      requestLoadDocument();
    }
  });
  const classes = useStyles();
  return (
    <SubContent title="Danh sách tài liệu">
      <Box pt={16}>
        <AppBar position="fixed" color="transparent" className={classes.appBar}>
          <Toolbar>
            <div className={classes.grow} />
            <Button variant="contained" color="primary">
              Tải lên
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {documents.map(document => (
            <ListItem key={document.fileName}>
              <Document
                fileName={document.fileName}
                img={document.img}
                description={document.description}
              />
            </ListItem>
          ))}

          {/* <ListItem>
            <Document
              title="Bảo hiểm y tế "
              imageLink="https://vnn-imgs-f.vgcloud.vn/2019/09/05/12/bhyt.jpg"
              author="Nguyen Van A"
            />
          </ListItem> */}
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
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoadingDocument(),
  documentPage: makeSelectDocumentPage(),
  documents: makeSelectDocuments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    requestLoadDocument: () => dispatch(loadDocument()),
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
