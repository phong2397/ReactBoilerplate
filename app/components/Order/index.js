/**
 *
 * Order
 *
 */

import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';

import LogoSGFT from 'images/main-logo-black.png';

import PropTypes from 'prop-types';
import { numberWithCommas } from '../../utils/formater';
// import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  middle: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  end: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    textAlign: 'right',
  },
  itemHeader: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .125)',
  },
  expanded: {},
  logo: {
    height: 64,
    border: '1px solid rgba(0, 0, 0, .125)',
    padding: theme.spacing(2),
  },
}));

function Order({ orderId, orderStatus, orderAmount, orderSubmitTime }) {
  const classes = useStyles();
  return (
    <ListItem>
      <Accordion className={classes.root} square expanded>
        <AccordionSummary
          className={classes.itemHeader}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography className={classes.heading}>
            {`Mã yêu cầu: ${orderId}9999`}
          </Typography>
          <Typography className={classes.middle}>
            {`Ngày tạo: ${orderSubmitTime}`}
          </Typography>
          <Typography className={classes.end}>
            <Link href={`/yeucau/don-yeu-cau/${orderId}`}>Chi tiết</Link>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <img src={LogoSGFT} alt="logo" className={classes.logo} />
          </Box>
          <Box p={1}>
            <Typography component="div">
              <Box>{`Số tiền yêu cầu: ${numberWithCommas(orderAmount)} đ`}</Box>
              <Box>{`Trạng thái: ${orderStatus}`}</Box>
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
}

Order.propTypes = {
  orderId: PropTypes.string,
  orderStatus: PropTypes.string,
  orderAmount: PropTypes.number,
  orderSubmitTime: PropTypes.string,
};

export default Order;
