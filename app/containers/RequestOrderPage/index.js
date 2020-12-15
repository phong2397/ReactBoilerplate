/**
 *
 * RequestOrderPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Button, makeStyles, Modal, Typography } from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRequestOrderPage, { makeSelectOpenModal } from './selectors';
import reducer from './reducer';
import saga from './saga';
import CustomerInfoCard from '../../components/CustomerInfoCard';
import { ShowRule } from '../../components/Rule';
import { makeSelectAmount, makeSelectFeeAmount } from '../HomePage/selectors';
import BankCard from '../../components/BankCard';
import { confirmOrderAction, sendOrderRequestAction } from './actions';
import SubContent from '../SubContent/Loadable';
import { makeSelectCurrentProfile } from '../App/selectors';
const useStyles = makeStyles(theme => ({
  paper: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export function RequestOrderPage({
  customer,
  amount,
  feeAmount,
  openModal,
  confirmOrder,
  sendOrderRequest,
}) {
  useInjectReducer({ key: 'requestOrderPage', reducer });
  useInjectSaga({ key: 'requestOrderPage', saga });
  const classes = useStyles();
  const body = (
    <div className={classes.paper}>
      <Box display="flex" justifyContent="center">
        <Box p={1}>
          <AssignmentTurnedInIcon style={{ fontSize: 80 }} color="primary" />
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Box p={2}>
          <Typography variant="h6" align="center">
            Chúc mừng bạn đã gửi yêu cầu thành công
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Box p={1}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={confirmOrder}
          >
            <b>Xác nhận</b>
          </Button>
        </Box>
      </Box>
    </div>
  );
  return (
    <div>
      <SubContent title="Gửi yêu cầu ứng lương">
        <Box pt={3} margin={1}>
          <CustomerInfoCard
            customerId={customer.customerId}
            customerName={customer.customerName}
            companyName={customer.companyName}
            amount={amount}
            feeAmount={feeAmount}
          />
          <Box p={1} />
          <BankCard
            bankName={customer.bankName}
            accNo={customer.accNo}
            accName={customer.accName}
          />

          <ShowRule />

          <Box pt={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={sendOrderRequest}
            >
              Yêu cầu ứng lương
            </Button>
            <Modal
              open={openModal}
              onClose={confirmOrder}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </Box>
        </Box>
      </SubContent>
    </div>
  );
}

RequestOrderPage.propTypes = {
  customer: PropTypes.object,
  amount: PropTypes.number,
  feeAmount: PropTypes.number,
  openModal: PropTypes.bool,
  confirmOrder: PropTypes.func,
  sendOrderRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  customer: makeSelectCurrentProfile(),
  amount: makeSelectAmount(),
  feeAmount: makeSelectFeeAmount(),
  requestOrderPage: makeSelectRequestOrderPage(),
  openModal: makeSelectOpenModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    sendOrderRequest: () => dispatch(sendOrderRequestAction()),
    confirmOrder: () => dispatch(confirmOrderAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RequestOrderPage);
