/**
 *
 * ConfirmPage
 *
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

import { numberWithCommas } from 'utils/formater';
import {
  getOrderFeeValue,
  getOrderValue,
  getProductConfig,
} from 'utils/storage';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import OtpConfirmDialog from 'components/OtpConfirmDialog';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectConfirmPage, {
  makeSelectBasicInfo,
  makeSelectErrors,
  makeSelectOpenDialog,
  makeSelectProductConfig,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getBasicInfo,
  requestOtpAction,
  verifyOtp,
  closeDialog,
} from './actions';
import { term } from './term';
import DetailRequest from '../../components/DetailRequest';
import { makeSelectLoading } from '../LoginPage/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  accordionHeader: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
  },
  accordion: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
}));

const convertRequestName = key => {
  switch (key) {
    case 'requestAmount':
      return 'Số tiền yêu cầu';
    case 'feeAmount':
      return 'Phí dịch vụ';
    case 'maxAdvance':
      return 'Số tiền có thể tạm ứng';
    default:
      break;
  }
  return '';
};
const fieldList = ['fullname', 'bankName', 'accName', 'accNo', 'phone'];

const convertFieldName = field => {
  switch (field) {
    case 'fullname':
      return 'Tên khách hàng';
    case 'gender':
      return 'Giới tính';
    case 'address':
      return 'Địa chỉ thường trú';
    case 'addressTemp':
      return 'Địa chỉ tạm trú';
    case 'birthday':
      return 'Ngày sinh';
    case 'email':
      return 'Email';
    case 'identity':
      return 'CMND/CCCD';
    case 'identityLocation':
      return 'Nơi cấp';
    case 'identityDate':
      return 'Ngày cấp';
    case 'identityAddress':
      return 'Nơi cấp';
    case 'phone':
      return 'Số điện thoại';
    case 'job':
      return 'Vị trí';
    case 'salaryPermonth':
      return 'Thu nhập hằng tháng';
    case 'bankName':
      return 'Tên Ngân hàng';
    case 'accNo':
      return 'Số tài khoản';
    case 'accName':
      return 'Tên tài khoản';

    default:
      break;
  }
  return field;
};
// const convertErrorStatus = code => {
//   switch (code) {
//     case '019':
//       return { field: 'phone', message: 'Số điện thoại không hợp lệ' };
//     case '013':
//       return { field: 'all', message: 'Yêu cầu gửi mã xác nhận quá nhiều' };
//     case '014':
//       return { field: 'otp', message: 'Mã OTP không chính xác. Bạn vui lòng nhập lại' };
//     case '028':
//       return { field: 'phone', message: 'Số điện thoại không hợp lệ' };
//     case '029':
//       return { field: 'companyId', message: 'Mã công ty không tồn tại' };
//     default:
//       return { field: 'all', message: 'Lỗi máy chủ' };
//   }
// };
export function ConfirmPage({
  dispatch,
  basicInfo,
  errors,
  openDialog,
  loading,
}) {
  useInjectReducer({ key: 'confirmPage', reducer });
  useInjectSaga({ key: 'confirmPage', saga });
  useEffect(() => {
    dispatch(getBasicInfo());
    titleRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, []);
  useEffect(() => {}, [openDialog]);
  const [openTerm, setOpenTerm] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);
  const titleRef = useRef(null);
  const handleCheckTerm = event => {
    setCheckTerm(event.target.checked);
  };
  const handleCloseTerm = () => {
    setOpenTerm(false);
  };
  const handleOpenTerm = () => {
    setOpenTerm(true);
  };
  const requestOrder = {
    requestAmount: `${numberWithCommas(getOrderValue())} đ`,
    feeAmount: `${numberWithCommas(getOrderFeeValue())} đ`,
    maxAdvance: `${numberWithCommas(Number(getProductConfig().maxAdvance))} đ`,
  };
  const classes = useStyles();
  const bodyTerm = (
    <List>
      <ListItem>{term.title}</ListItem>
      <ListItem>{term.timeApply}</ListItem>
      <ListItem>{term.description}</ListItem>
      {term.content.map(q => (
        <div key={q.id}>
          <List>
            <ListItem>{`${q.id}. ${q.name}`}</ListItem>
            {q.rules.map(rule => (
              <div key={rule.subId}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={`Điều khoản ${rule.subId}: ${rule.name}`}
                    />
                  </ListItem>

                  {rule.content.map((c, cIndex) => (
                    <List>
                      <ListItem>{`${rule.subId}.${cIndex + 1}. ${
                        c.content
                      }`}</ListItem>
                      {c.subContent &&
                        c.subContent.map((c1, c1Index) => (
                          <List>
                            <ListItem>{`${rule.subId}.${cIndex + 1}.${c1Index +
                              1}. ${c1.content}`}</ListItem>
                            {c1.subContent &&
                              c1.subContent.map((c2, c2Index) => (
                                <List>
                                  <ListItem>{`${rule.subId}.${cIndex +
                                    1}.${c1Index + 1}.${c2Index + 1}. ${
                                    c2.content
                                  }`}</ListItem>
                                </List>
                              ))}
                          </List>
                        ))}
                    </List>
                  ))}
                </List>
              </div>
            ))}
          </List>
          <Divider />
        </div>
      ))}
    </List>
  );

  return (
    <div className={classes.root}>
      <Paper elevation={3} variant="outlined" square>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
          ref={titleRef}
        >
          <Box mt={3} fontWeight="fontWeightBold">
            Xác nhận
          </Box>
        </Typography>
        {loading ? (
          <Box w={1} className={classes.loader} justifyContent="center">
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box m={6} pt={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Alert severity="warning">
                  Vui lòng kiểm tra thông tin trước khi xác nhận.
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <Accordion expanded className={classes.accordion}>
                  <AccordionSummary
                    className={classes.accordionHeader}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Thông tin người yêu cầu
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1}>
                      {basicInfo &&
                        Object.keys(fieldList).map((key, index) => (
                          <Grid xs={12} item key={key}>
                            <Box display="flex" p={1}>
                              <Box p={1} flexGrow={1}>
                                {convertFieldName(fieldList[index])}:
                              </Box>
                              <Box
                                textAlign="right"
                                fontWeight="fontWeightBold"
                                flexShrink={1}
                                p={1}
                              >
                                {basicInfo[fieldList[index]]}
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion square expanded className={classes.accordion}>
                  <AccordionSummary
                    className={classes.accordionHeader}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Thông tin yêu cầu
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1} alignContent="center">
                      {Object.keys(requestOrder).map(key => (
                        <Grid xs={12} item key={key}>
                          <Box display="flex" p={1}>
                            <Box
                              p={1}
                              flexGrow={1}
                              display="flex"
                              alignItems="center"
                            >
                              {convertRequestName(key)}:
                              {key === 'feeAmount' && (
                                <DetailRequest
                                  label=""
                                  content={`${
                                    getProductConfig().productRate
                                  } % x Số tiền yêu cầu = ${
                                    getProductConfig().productRate
                                  } % x ${numberWithCommas(
                                    requestOrder.requestAmount,
                                  )} = ${numberWithCommas(requestOrder[key])}`}
                                />
                              )}
                              {key === 'maxAdvance' && (
                                <DetailRequest
                                  label=""
                                  content={
                                    <div>
                                      <Box>
                                        (Số ngày công / Tổng ngày trong tháng) x{' '}
                                        {getProductConfig().rateAdvance * 100}%
                                        x Lương
                                      </Box>
                                      <Box>
                                        =({new Date().getDate()} ngày /{' '}
                                        {daysInMonth(new Date())} ngày ) x{' '}
                                        {getProductConfig().rateAdvance * 100}%
                                        x{' '}
                                        {numberWithCommas(
                                          Number(
                                            getProductConfig().productAmountMax,
                                          ),
                                        )}{' '}
                                        đ = {requestOrder[key]}
                                      </Box>
                                    </div>
                                  }
                                />
                              )}
                            </Box>

                            <Box
                              textAlign="right"
                              fontWeight="fontWeightBold"
                              flexShrink={1}
                              p={1}
                              alignItems="center"
                            >
                              {requestOrder[key]}
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={checkTerm}
                        onChange={handleCheckTerm}
                      />
                    }
                    label={
                      <div>
                        Tôi đồng ý với{' '}
                        <Link
                          href="#dieukhoan"
                          onClick={() => handleOpenTerm()}
                        >
                          điều khoản
                        </Link>
                      </div>
                    }
                  />
                </FormGroup>
                <Dialog
                  open={openTerm}
                  onClose={handleCloseTerm}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Điều khoản sử dụng
                  </DialogTitle>
                  <DialogContent>{bodyTerm}</DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseTerm} color="primary">
                      Đóng
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Box m={2} pt={3}>
              {checkTerm ? (
                <OtpConfirmDialog
                  label="Tiếp tục"
                  phone={basicInfo.phone}
                  handleSendOtp={() =>
                    dispatch(requestOtpAction(basicInfo.phone))
                  }
                  handleVerifyOtp={otp => dispatch(verifyOtp(otp))}
                  handleCloseDialog={() => dispatch(closeDialog())}
                  errors={errors}
                  openDialog={openDialog}
                />
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled
                >
                  Bạn phải đồng ý với điều khoản
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </div>
  );
}

ConfirmPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.any,
  basicInfo: PropTypes.object,
  openDialog: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  confirmPage: makeSelectConfirmPage(),
  basicInfo: makeSelectBasicInfo(),
  errors: makeSelectErrors(),
  openDialog: makeSelectOpenDialog(),
  productConfig: makeSelectProductConfig(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
function daysInMonth(anyDateInMonth) {
  return new Date(
    anyDateInMonth.getFullYear(),
    anyDateInMonth.getMonth() + 1,
    0,
  ).getDate();
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ConfirmPage);
