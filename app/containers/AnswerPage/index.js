/**
 *
 * AnswerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Typography, Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAnswerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function AnswerPage() {
  useInjectReducer({ key: 'answerPage', reducer });
  useInjectSaga({ key: 'answerPage', saga });

  const { id } = useParams();
  const history = useHistory();
  const item = find(id);
  const backFunc = () => {
    history.push('/faq');
  };

  return (
    <div>
      {/* <FormattedMessage {...messages.header} /> */}
      <Typography variant="h3" gutterBottom>
        Câu hỏi #{id}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {item.question}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {item.answer}
      </Typography>

      <Button variant="contained" onClick={backFunc}>
        Trờ lại
      </Button>
    </div>
  );
}

AnswerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  answerPage: makeSelectAnswerPage(),
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

export default compose(withConnect)(AnswerPage);
