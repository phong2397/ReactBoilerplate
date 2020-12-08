/**
 *
 * FaqPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Box, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFaqPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { data } from './data';

export function FaqPage() {
  useInjectReducer({ key: 'faqPage', reducer });
  useInjectSaga({ key: 'faqPage', saga });

  return (
    <Box mt={6} p={3}>
      <List>
        {data.map(q => (
          <div key={q.id}>
            <ListItem button component={Link} to={`/question/${q.id}`}>
              <ListItemText primary={`${q.id}. ${q.question}`} />
              <ArrowForwardIos />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Box m={12} />
    </Box>
  );
}

FaqPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  faqPage: makeSelectFaqPage(),
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

export default compose(withConnect)(FaqPage);
