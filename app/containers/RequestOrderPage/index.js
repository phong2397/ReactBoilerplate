/**
 *
 * RequestOrderPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Modal,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRequestOrderPage, {
  makeSelectOpenModal,
  makeSelectCheckTerm,
  makeSelectOpenTerm,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import CustomerInfoCard from '../../components/CustomerInfoCard';
import { makeSelectAmount, makeSelectFeeAmount } from '../HomePage/selectors';
import BankCard from '../../components/BankCard';
import {
  checkTermPolicy,
  closeTermModal,
  confirmOrderAction,
  openTermModal,
  sendOrderRequestAction,
} from './actions';
import SubContent from '../SubContent/Loadable';
import { makeSelectCurrentProfile } from '../App/selectors';
import { data } from './data';

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
  term: {
    color: 'black',
    backgroundColor: '#FCF6F6',
    position: 'absolute',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    overflow: 'scroll',
    height: '90%',
    display: 'block',
    width: '90%',
    boxShadow: theme.shadows[5],
  },
}));
export function RequestOrderPage({
  customer,
  amount,
  feeAmount,
  openModal,
  confirmOrder,
  sendOrderRequest,
  checkTerm,
  handleChange,
  handleOpenTerm,
  openTerm,
  handleCloseTerm,
  error,
}) {
  useInjectReducer({ key: 'requestOrderPage', reducer });
  useInjectSaga({ key: 'requestOrderPage', saga });
  const classes = useStyles();
  const bodyTerm = (
    <div className={classes.term}>
      <Container component="main" maxWidth="sm">
        <Typography variant="h5" align="center">
          Điều khoản sử dụng
        </Typography>
        <List>
          {data.map(q => (
            <div key={q.id}>
              <ListItem>
                <ListItemText primary={`${q.id}. ${q.name}`} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>

        <Typography variant="h5" align="center">
          <Button align="center" variant="contained" onClick={handleCloseTerm}>
            Đóng
          </Button>
        </Typography>
      </Container>
    </div>
  );

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
            customerCode={customer.customerCode}
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
          <FormControl
            required
            component="fieldset"
            className={classes.formControl}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkTerm}
                    onChange={handleChange}
                    name="checkTerm"
                  />
                }
                label={
                  <span>
                    Tôi đồng ý với{' '}
                    <Link href="#term" onClick={handleOpenTerm}>
                      điều khoản
                    </Link>
                  </span>
                }
              />
            </FormGroup>
          </FormControl>
          {error && <Alert severity="error">{error.message}</Alert>}
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
            <Modal
              open={openTerm}
              onClose={handleCloseTerm}
              aria-labelledby="simple-modal-title-term"
              aria-describedby="simple-modal-description-term"
            >
              {bodyTerm}
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
  checkTerm: PropTypes.bool,
  handleChange: PropTypes.func,
  handleOpenTerm: PropTypes.func,
  handleCloseTerm: PropTypes.func,
  openTerm: PropTypes.bool,
  error: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  customer: makeSelectCurrentProfile(),
  amount: makeSelectAmount(),
  feeAmount: makeSelectFeeAmount(),
  requestOrderPage: makeSelectRequestOrderPage(),
  openModal: makeSelectOpenModal(),
  checkTerm: makeSelectCheckTerm(),
  openTerm: makeSelectOpenTerm(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    sendOrderRequest: () => dispatch(sendOrderRequestAction()),
    confirmOrder: () => dispatch(confirmOrderAction()),
    handleChange: evt => dispatch(checkTermPolicy(evt.target.checked)),
    handleOpenTerm: () => dispatch(openTermModal()),
    handleCloseTerm: () => dispatch(closeTermModal()),
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
