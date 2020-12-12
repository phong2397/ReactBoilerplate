/**
 *
 * HistoryPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import OrderInfo from 'components/OrderInfo';
import { Box, List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { loadingOrders } from './actions';
import makeSelectHistoryPage, {
  makeSelectListOrders,
  makeSelectLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import SubContent from '../SubContent/Loadable';
export function HistoryPage({ loading, listOrders, loadOrders }) {
  useInjectReducer({ key: 'historyPage', reducer });
  useInjectSaga({ key: 'historyPage', saga });

  console.log('LIST ORDER: ', listOrders);
  useEffect(() => {
    if (loading) {
      console.log('LOAD PRODUCT CONFIG ?');
      loadOrders();
    }
  });

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
                orderId={order.orderIdDisplay}
                orderStatus={order.orderStatus}
                orderAmount={order.orderAmount}
                submitTime={order.submitTime}
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
  loading: PropTypes.bool,
  listOrders: PropTypes.array,
  loadOrders: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  historyPage: makeSelectHistoryPage(),
  listOrders: makeSelectListOrders(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadOrders: () => dispatch(loadingOrders()),
    // loadOrders: () => console.log('STEP 1'),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HistoryPage);
