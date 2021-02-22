/**
 *
 * BasicInfoForm
 *
 */

import React, { useEffect, useState, useRef } from 'react';

import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import history from 'utils/history';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AddressBox from 'components/AddressBox';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import NumberFormat from 'react-number-format';
import makeSelectBasicInfoForm, {
  makeSelectBasicInfo,
  makeSelectBirthday,
  makeSelectCompanyInfo,
  makeSelectDistrict,
  makeSelectDistrictList,
  makeSelectErrorResponse,
  makeSelectLoading,
  makeSelectLoadState,
  makeSelectLocation,
  makeSelectProvince,
  makeSelectProvinceList,
  makeSelectSkip,
  makeSelectWard,
  makeSelectWardList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loadBasicInfoForm,
  loadingAction,
  updateBasicInfoAction,
} from './actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  infoBox: {
    padding: theme.spacing(2),
  },
  accordionBox: {
    backgroundColor: 'rgba(0, 0, 0, .01)',
    border: '0',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  accordionHeader: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
  },
  loader: {
    margin: '0 auto',
    display: 'flex',
  },
}));
const errorMessageType = {
  notEmpty: 'Trường này không được để trống',
};
const schema = yup.object().shape({
  birthday: yup.string().required(errorMessageType.notEmpty),
  fullname: yup.string().required(errorMessageType.notEmpty),
  gender: yup.string().required(errorMessageType.notEmpty),
  identity: yup.string().required(errorMessageType.notEmpty),
  identityDate: yup.string().required(errorMessageType.notEmpty),
  identityLocation: yup.string().required(errorMessageType.notEmpty),
  job: yup.string().required(errorMessageType.notEmpty),
  phone: yup.string().required(errorMessageType.notEmpty),
  salaryPermonth: yup.string().required(errorMessageType.notEmpty),
  accName: yup.string().required(errorMessageType.notEmpty),
  accNo: yup.string().required(errorMessageType.notEmpty),
  bankName: yup.string().required(errorMessageType.notEmpty),
  email: yup.string().required(errorMessageType.notEmpty),
  companyName: yup.string(),
  companyPhone: yup.string(),
  contract: yup.string().required(errorMessageType.notEmpty),
  address: yup.object().shape({
    description: yup.string().required(errorMessageType.notEmpty),
    province: yup
      .object()
      .nullable()
      .required(errorMessageType.notEmpty),
    district: yup
      .object()
      .nullable()
      .required(errorMessageType.notEmpty),
    ward: yup
      .object()
      .nullable()
      .required(errorMessageType.notEmpty),
  }),
  addressTemp: yup.object().shape({
    description: yup.string().required(errorMessageType.notEmpty),
    province: yup
      .object()
      .nullable()
      .required(errorMessageType.notEmpty),
    district: yup
      .object()
      .nullable()
      .required(errorMessageType.notEmpty),
    ward: yup
      .object()
      .nullable()
      .required(errorMessageType.notEmpty),
  }),
});
function findAddressInLocation(location, a) {
  if (a.province && a.district && a.ward) {
    const province = location.find(prov => prov.name === a.province.name);
    const district =
      province && province.huyen !== undefined
        ? province.huyen.find(dist => dist.name === a.district.name)
        : null;
    const ward =
      district && district.xa !== undefined
        ? district.xa.find(w => w.name === a.ward.name)
        : null;
    return { province, district, ward };
  }
  return { province: null, district: null, ward: null };
}

export function BasicInfoForm({
  dispatch,
  basicInfo,
  skip,
  location,
  companyInfo,
  loading,
  loadingState,
  errorResponse,
}) {
  const classes = useStyles();
  const [addressBoxValue, setAddressBoxValue] = useState(null);
  const [addressTempBoxValue, setAddressTempBoxValue] = useState(null);
  const [identityDate, setIdentityDate] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const titleRef = useRef(null);
  const genderRef = useRef(null);
  const addressRef = useRef(null);
  const addressTempRef = useRef(null);
  useInjectReducer({ key: 'basicInfoForm', reducer });
  useInjectSaga({ key: 'basicInfoForm', saga });
  useEffect(() => {
    if (
      loadingState.company &&
      loadingState.basicInfo &&
      loadingState.location
    ) {
      dispatch(loadingAction(false));
      titleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [loadingState]);
  useEffect(() => {
    if (skip) history.push('/tai-lieu');
  }, [skip]);

  useEffect(() => {
    dispatch(loadBasicInfoForm());
  }, []);
  useEffect(() => {
    if (basicInfo && location.length !== 0) {
      const foundAddress = findAddressInLocation(location, basicInfo.address);
      const foundAddressTemp = findAddressInLocation(
        location,
        basicInfo.addressTemp,
      );
      const filledAddress = {
        ...foundAddress,
        description: basicInfo.address.description,
      };
      const filledAddressTemp = {
        ...foundAddressTemp,
        description: basicInfo.addressTemp.description,
      };

      setAddressBoxValue(filledAddress);
      setAddressTempBoxValue(filledAddressTemp);
      reset({
        ...basicInfo,
        address: filledAddress,
        addressTemp: filledAddressTemp,
      });
      const bd = basicInfo.birthday.split('/');
      const idate = basicInfo.identityDate.split('/');
      setBirthday(new Date(bd[2], bd[1] - 1, bd[0]));
      setIdentityDate(new Date(idate[2], idate[1] - 1, idate[0]));
    }
  }, [basicInfo, location]);
  const { register, reset, errors, handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });
  useEffect(() => {
    if (companyInfo) {
      setCompanyName(companyInfo.companyName ? companyInfo.companyName : '');
      setCompanyPhone(companyInfo.companyPhone ? companyInfo.companyPhone : '');
    }
  }, [companyInfo]);

  const onError = err => {
    if (err.gender)
      genderRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    if (err.address)
      addressRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    if (err.addressTemp)
      addressTempRef.current.scrollIntoView({
        behavior: 'smooth',
      });
  };
  const onSubmit = data => {
    dispatch(updateBasicInfoAction(data));
  };
  return (
    <div>
      <Snackbar open={!!errorResponse} autoHideDuration={6000}>
        <Alert severity="error">Lỗi không cập nhật được</Alert>
      </Snackbar>
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
            Thông tin cơ bản
          </Box>
        </Typography>
        <form
          className={classes.root}
          noValidate
          onSubmit={handleSubmit(onSubmit, onError)}
          autoComplete="off"
        >
          {loading ? (
            <Box w={1} className={classes.loader} justifyContent="center">
              <CircularProgress size={40} />
            </Box>
          ) : (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Accordion
                  square
                  defaultExpanded
                  className={classes.accordionBox}
                >
                  <AccordionSummary
                    className={classes.accordionHeader}
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Thông tin cá nhân
                    </Typography>
                  </AccordionSummary>
                  <Grid container spacing={3} className={classes.infoBox}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.fullname} component="legend">
                          Họ tên
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="fullname"
                          placeholder="Nhập họ và tên"
                          name="fullname"
                          variant="outlined"
                          inputRef={register}
                          error={!!errors.fullname}
                        />
                        <FormHelperText error={!!errors.fullname} id="fullname">
                          {errors.fullname && errors.fullname.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel component="legend">Giới tính</FormLabel>
                        <Controller
                          as={
                            <RadioGroup row aria-label="gender">
                              <FormControlLabel
                                value="Nam"
                                control={<Radio />}
                                label="Nam"
                              />
                              <FormControlLabel
                                value="Nữ"
                                control={<Radio />}
                                label="Nữ"
                              />
                            </RadioGroup>
                          }
                          name="gender"
                          control={control}
                          defaultValue=""
                        />
                        <FormHelperText error={!!errors.gender} id="fullname">
                          {errors.gender && errors.gender.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel component="legend">Ngày sinh</FormLabel>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            fullWidth
                            value={birthday}
                            onChange={date => setBirthday(date)}
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            id="birthday"
                            name="birthday"
                            inputRef={register}
                            error={!!errors.birthDay}
                          />
                        </MuiPickersUtilsProvider>
                        <FormHelperText error={!!errors.birthDay} id="birthday">
                          {errors.birthDay && errors.birthDay.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel component="legend">Số CMND/CCCD</FormLabel>
                        <TextField
                          required
                          fullWidth
                          placeholder="Nhập số CMND/CCCD"
                          variant="outlined"
                          id="identity"
                          name="identity"
                          inputProps={{ maxLength: 9 }}
                          type="number"
                          error={!!errors.identity}
                          inputRef={register}
                        />
                        <FormHelperText error={!!errors.identity} id="identity">
                          {errors.identity && errors.identity.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <FormLabel component="legend">Ngày cấp</FormLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                fullWidth
                                value={identityDate}
                                onChange={date => setIdentityDate(date)}
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                id="identityDate"
                                name="identityDate"
                                inputRef={register}
                                error={!!errors.identityDate}
                              />
                            </MuiPickersUtilsProvider>
                            <FormHelperText
                              error={!!errors.identityDate}
                              id="identityDate"
                            >
                              {errors.identityDate &&
                                errors.identityDate.message}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <FormLabel component="legend">Nơi cấp</FormLabel>
                            <TextField
                              required
                              fullWidth
                              variant="outlined"
                              id="identityLocation"
                              name="identityLocation"
                              error={!!errors.identityLocation}
                              inputRef={register}
                            />
                            <FormHelperText
                              error={!!errors.identityLocation}
                              id="identity"
                            >
                              {errors.identityLocation &&
                                errors.identityLocation.message}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Accordion>
              </Grid>
              <Grid item xs={12} ref={addressRef}>
                <AddressBox
                  address={{ name: 'address' }}
                  title="Địa chỉ thường trú"
                  location={location}
                  control={control}
                  register={register}
                  addressValue={addressBoxValue}
                  errors={errors.address}
                  setValue={setValue}
                />
              </Grid>
              <Grid item xs={12} ref={addressTempRef}>
                <AddressBox
                  address={{ name: 'addressTemp' }}
                  title="Địa chỉ tạm trú"
                  location={location}
                  control={control}
                  register={register}
                  addressValue={addressTempBoxValue}
                  errors={errors.addressTemp}
                  setValue={setValue}
                />
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  square
                  defaultExpanded
                  className={classes.accordionBox}
                >
                  <AccordionSummary
                    className={classes.accordionHeader}
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Liên lạc
                    </Typography>
                  </AccordionSummary>
                  <Grid container spacing={3} className={classes.infoBox}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.email} component="legend">
                          Email
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          placeholder="Nhập email"
                          type="email"
                          variant="outlined"
                          name="email"
                          error={!!errors.email}
                          inputRef={register}
                        />
                        <FormHelperText error={!!errors.email} id="email">
                          {errors.email && errors.email.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.phone} component="legend">
                          Số điện thoại
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="phone"
                          placeholder="Nhập số điện thoại"
                          type="tel"
                          variant="outlined"
                          name="phone"
                          error={!!errors.phone}
                          InputProps={{
                            readOnly: true,
                          }}
                          inputRef={register}
                        />
                        <FormHelperText error={!!errors.phone} id="phone">
                          {errors.phone && errors.phone.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  square
                  defaultExpanded
                  className={classes.accordionBox}
                >
                  <AccordionSummary
                    className={classes.accordionHeader}
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Công việc
                    </Typography>
                  </AccordionSummary>
                  <Grid container spacing={3} className={classes.infoBox}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel
                          error={!!errors.companyName}
                          component="legend"
                        >
                          Tên công ty
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="companyName"
                          placeholder="Tên công ty"
                          variant="outlined"
                          value={companyName}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <FormHelperText id="companyPhone">
                          Trường này không nhập vào
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel
                          error={!!errors.companyPhone}
                          component="legend"
                        >
                          Số điện thoại công ty
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="companyPhone"
                          placeholder="Số điện thoại công ty"
                          variant="outlined"
                          value={companyPhone}
                          name="companyPhone"
                          InputProps={{
                            readOnly: true,
                          }}
                          error={!!errors.companyPhone}
                        />
                        <FormHelperText id="companyPhone">
                          Trường này không nhập vào
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel
                          error={!!errors.customerCode}
                          component="legend"
                        >
                          Mã nhân viên
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="customerCode"
                          placeholder="Nhập mã nhân viên"
                          variant="outlined"
                          name="customerCode"
                          inputRef={register}
                          error={!!errors.customerCode}
                        />
                        <FormHelperText
                          error={!!errors.customerCode}
                          id="customerCode"
                        >
                          {errors.customerCode && errors.customerCode.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel component="legend">Loại hợp đồng</FormLabel>
                        <Controller
                          as={
                            <RadioGroup row aria-label="t">
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="Hợp đồng tạm thời"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="Hợp đồng chính thức"
                              />
                            </RadioGroup>
                          }
                          name="contract"
                          control={control}
                          defaultValue=""
                        />
                        <FormHelperText error={!!errors.contract} id="contract">
                          {errors.contract && errors.contract.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.job} component="legend">
                          Vị trí
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="job"
                          placeholder="Vị trí"
                          variant="outlined"
                          name="job"
                          inputRef={register}
                          error={!!errors.job}
                        />
                        <FormHelperText error={!!errors.job} id="job">
                          {errors.job && errors.job.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel
                          error={!!errors.salaryPermonth}
                          component="legend"
                        >
                          Thu nhập hằng tháng
                        </FormLabel>
                        <Controller
                          as={
                            <NumberFormat
                              customInput={TextField}
                              placeholder="Nhập thu nhập hằng tháng"
                              thousandSeparator
                              suffix=" đ"
                              error={!!errors.salaryPermonth}
                              onValueChange={v => {
                                setValue('salaryPermonth', v.value);
                              }}
                            />
                          }
                          id="salaryPermonth"
                          name="salaryPermonth"
                          fullWidth
                          variant="outlined"
                          control={control}
                        />
                        {/* <TextField
                          required
                          fullWidth
                          id="salaryPermonth"
                          variant="outlined"
                          name="salaryPermonth"
                          inputRef={register}
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                        /> */}
                        <FormHelperText
                          error={!!errors.salaryPermonth}
                          id="salaryPermonth"
                        >
                          {errors.salaryPermonth &&
                            errors.salaryPermonth.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  square
                  defaultExpanded
                  className={classes.accordionBox}
                >
                  <AccordionSummary
                    className={classes.accordionHeader}
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Tài khoản nhận
                    </Typography>
                  </AccordionSummary>
                  <Grid container spacing={3} className={classes.infoBox}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.bankName} component="legend">
                          Tên ngân hàng
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="bankName"
                          placeholder="Nhập tên ngân hàng"
                          variant="outlined"
                          name="bankName"
                          inputRef={register}
                          error={!!errors.bankName}
                        />
                        <FormHelperText error={!!errors.bankName} id="phone">
                          {errors.bankName && errors.bankName.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.accNo} component="legend">
                          Số tài khoản
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="accNo"
                          placeholder="Nhập số tài khoản"
                          variant="outlined"
                          name="accNo"
                          inputRef={register}
                          error={!!errors.accNo}
                        />
                        <FormHelperText error={!!errors.accNo} id="accNo">
                          {errors.accNo && errors.accNo.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FormLabel error={!!errors.accName} component="legend">
                          Tên tài khoản
                        </FormLabel>
                        <TextField
                          required
                          fullWidth
                          id="accName"
                          placeholder="Nhập tên tài khoản"
                          variant="outlined"
                          name="accName"
                          inputRef={register}
                          error={!!errors.accName}
                        />
                        <FormHelperText error={!!errors.accName} id="accName">
                          {errors.accName && errors.accName.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Accordion>
              </Grid>
              <Grid xs={12} item>
                <Box p={2}>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Tiếp tục
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </form>
      </Paper>
    </div>
  );
}

BasicInfoForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.array,
  basicInfo: PropTypes.object,
  skip: PropTypes.bool,
  companyInfo: PropTypes.object,
  loading: PropTypes.bool,
  loadingState: PropTypes.object,
  errorResponse: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  basicInfoForm: makeSelectBasicInfoForm(),
  birthday: makeSelectBirthday(),
  location: makeSelectLocation(),
  province: makeSelectProvince(),
  district: makeSelectDistrict(),
  ward: makeSelectWard(),
  provinceList: makeSelectProvinceList(),
  districtList: makeSelectDistrictList(),
  wardList: makeSelectWardList(),
  basicInfo: makeSelectBasicInfo(),
  skip: makeSelectSkip(),
  companyInfo: makeSelectCompanyInfo(),
  loading: makeSelectLoading(),
  loadingState: makeSelectLoadState(),
  errorResponse: makeSelectErrorResponse(),
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

export default compose(withConnect)(BasicInfoForm);
