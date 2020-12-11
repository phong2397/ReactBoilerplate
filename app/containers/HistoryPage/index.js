/**
 *
 * HistoryPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import OrderInfo from 'components/OrderInfo';
import { Box, List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

import makeSelectHistoryPage, { makeSelectListOrders } from './selectors';
import reducer from './reducer';
import saga from './saga';
import SubContent from '../SubContent/Loadable';
export function HistoryPage({ listOrders }) {
  useInjectReducer({ key: 'historyPage', reducer });
  useInjectSaga({ key: 'historyPage', saga });

  console.log('LIST ORDER: ', listOrders);

  return (
    <SubContent title="Lịch sử yêu cầu">
      <Box mt={6}>
        <List>
          {listOrders.map(order => (
            <ListItem
              key={order.orderId}
              button
              component={Link}
              to={`/orders/${order.orderId}`}
            >
              <OrderInfo
                orderId={order.orderId}
                orderStatus={order.orderStatus}
                orderAmount={order.orderAmount}
                submitTime={order.orderSubmit}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </SubContent>
  );
}

HistoryPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  listOrders: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  historyPage: makeSelectHistoryPage(),
  listOrders: makeSelectListOrders(),
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
