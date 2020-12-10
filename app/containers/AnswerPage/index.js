/**
 *
 * AnswerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Box, Typography } from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAnswerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { data } from '../FaqPage/data';
import SubContent from '../SubContent/Loadable';
function find(id) {
  // eslint-disable-next-line eqeqeq
  return data.find(q => q.id == id);
}

export function AnswerPage({ match }) {
  useInjectReducer({ key: 'answerPage', reducer });
  useInjectSaga({ key: 'answerPage', saga });
  const { id } = match.params;
  const item = find(id);

  return (
    <SubContent title={`#${id}`}>
      <Box pt={8} px={2}>
        <Typography gutterBottom variant="h5" component="h2">
          Câu hỏi
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {item.question}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          <b>Trả lời</b>
        </Typography>
        <Typography variant="body1" component="p">
          {item.answer}
        </Typography>
      </Box>
    </SubContent>
  );
}

AnswerPage.propTypes = {
  match: PropTypes.any,
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
