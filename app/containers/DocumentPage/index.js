/**
 *
 * DocumentPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import UploadImage from 'components/UploadImage';
import Document from 'components/Document';

import makeSelectDocumentPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function DocumentPage() {
  useInjectReducer({ key: 'documentPage', reducer });
  useInjectSaga({ key: 'documentPage', saga });

  return (
    <div>
      <UploadImage />
      <Document
        title="Bằng lái xe"
        imageLink="https://daotaolaixeso3.edu.vn/uploaded/goc-tu-van/han-doi-bang-lai-xe-o-to/2-han-doi-bang-lai-xe-o-to.jpg"
        author="Nguyen Van A"
      />

      <Document
        title="Bảo hiểm y tế "
        imageLink="https://vnn-imgs-f.vgcloud.vn/2019/09/05/12/bhyt.jpg"
        author="Nguyen Van A"
      />
    </div>
  );
}

DocumentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  documentPage: makeSelectDocumentPage(),
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

export default compose(
  withConnect,
  memo,
)(DocumentPage);
