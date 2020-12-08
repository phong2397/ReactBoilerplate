/**
 *
 * HistoryPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import OrderInfo from "components/OrderInfo";
import { List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";

import makeSelectHistoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function HistoryPage() {
  useInjectReducer({ key: 'historyPage', reducer });
  useInjectSaga({ key: 'historyPage', saga });

  return (
    <div>
      <List>
        <ListItem button component={Link} to="/orders/1">
          <OrderInfo orderId="#0010" orderStatus="Đang chờ giải ngân" orderAmount="1000000" submitTime="7/12/2020 16:50"></OrderInfo>
        </ListItem>
       
        <ListItem button component={Link} to="/orders/1">
          <OrderInfo orderId="#0012" orderStatus="Đang chờ giải ngân" orderAmount="1000000" submitTime="1/12/2020 13:23"></OrderInfo>
        </ListItem>

      </List>
    </div>
  );
}

HistoryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  historyPage: makeSelectHistoryPage(),
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

export default compose(withConnect)(HistoryPage);
