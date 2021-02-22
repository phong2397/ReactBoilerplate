/**
 *
 * AddressBox
 *
 */

import {
  Accordion,
  AccordionSummary,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6),
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
}));
function findByProvince(provinceList, province) {
  if (province === null) return null;
  return provinceList.find(prov => prov.name === province.name);
}
function findByDistrict(districtList, district) {
  if (district === null) return null;
  return districtList.find(dist => dist.name === district.name);
}
// function findByWard(district, ward) {
//   if (district === null) return null;
//   if (ward === null) return null;
//   return district.xa.find(w => w.name === ward.name);
// }
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

function AddressBox({
  address,
  title,
  errors,
  location,
  register,
  control,
  addressValue,
  setValue,
}) {
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  useEffect(() => {
    if (addressValue) {
      const a = findAddressInLocation(location, addressValue);
      setProvince(a.province);
      setDistrict(a.district);
      setWard(a.ward);
      setDistrictList(a.province ? a.province.huyen : []);
      setWardList(a.district ? a.district.xa : []);
    }
  }, [addressValue, location]);
  useEffect(() => {}, [province, district, ward]);
  useEffect(() => {
    setProvinceList(location);
    setDistrictList([]);
    setWardList([]);
  }, [location]);
  const classes = useStyles();
  return (
    <Accordion square defaultExpanded className={classes.accordionBox}>
      <AccordionSummary
        className={classes.accordionHeader}
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
      </AccordionSummary>
      <Grid container spacing={3} className={classes.infoBox}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FormLabel
              error={errors && errors.province !== undefined}
              component="legend"
            >
              Tỉnh/Thành phố
            </FormLabel>
            <Controller
              id={`${address.name}.province`}
              name={`${address.name}.province`}
              defaultValue={null}
              control={control}
              error={errors && errors.province !== undefined}
              render={props => (
                <Autocomplete
                  {...props}
                  options={provinceList}
                  value={province}
                  defaultValue={null}
                  getOptionLabel={option => option.name}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(_, newValue) => {
                    const prov = findByProvince(provinceList, newValue);
                    setValue(`${address.name}.province`, newValue);
                    setProvince(newValue);
                    setDistrict(null);
                    setWard(null);
                    setValue(`${address.name}.district`, null);
                    setValue(`${address.name}.ward`, null);
                    setDistrictList(prov ? prov.huyen : []);
                    setWardList([]);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      value={province}
                      placeholder="Nhập Tỉnh/Thành phố"
                      variant="outlined"
                      error={errors && errors.province !== undefined}
                    />
                  )}
                />
              )}
            />
            <FormHelperText
              error={errors && errors.province !== undefined}
              id={`${address.name}.province`}
            >
              {errors &&
                errors.province !== undefined &&
                errors.province.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FormLabel
              error={errors && errors.district !== undefined}
              component="legend"
            >
              Huyện/Quận
            </FormLabel>
            <Controller
              id={`${address.name}.district`}
              name={`${address.name}.district`}
              error={errors && errors.district !== undefined}
              defaultValue={null}
              render={props => (
                <Autocomplete
                  {...props}
                  value={district}
                  options={districtList}
                  getOptionLabel={option => option.name}
                  onChange={(_, newValue) => {
                    const distList = findByDistrict(districtList, newValue);
                    setDistrict(newValue);
                    setValue(`${address.name}.district`, newValue);
                    setWard(null);
                    setValue(`${address.name}.ward`, null);
                    setWardList(distList ? distList.xa : []);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="Nhập Huyện/Quận"
                      variant="outlined"
                      error={errors && errors.district !== undefined}
                    />
                  )}
                />
              )}
              control={control}
            />
            <FormHelperText
              error={errors && errors.district !== undefined}
              id={`${address.name}.district`}
            >
              {errors &&
                errors.district !== undefined &&
                errors.district.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FormLabel
              error={errors && errors.ward !== undefined}
              component="legend"
            >
              Xã/Phường
            </FormLabel>
            <Controller
              id={`${address.name}.ward`}
              name={`${address.name}.ward`}
              control={control}
              error={errors && errors.ward !== undefined}
              defaultValue={null}
              render={props => (
                <Autocomplete
                  {...props}
                  options={wardList}
                  value={ward}
                  getOptionLabel={option => option.name}
                  onChange={(_, newValue) => {
                    setWard(newValue);
                    setValue(`${address.name}.ward`, newValue);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="Nhập Xã/Phường"
                      variant="outlined"
                      error={errors && errors.ward !== undefined}
                    />
                  )}
                />
              )}
            />
            <FormHelperText
              error={errors && errors.ward !== undefined}
              id={`${address.name}.ward`}
            >
              {errors && errors.ward !== undefined && errors.ward.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel component="legend">Nhập địa chỉ</FormLabel>
            <TextField
              required
              fullWidth
              id={`${address.name}.description`}
              name={`${address.name}.description`}
              placeholder="Nhập địa chỉ (Số nhà, đường, ...)"
              type="text"
              variant="outlined"
              error={errors && errors.description !== undefined}
              inputRef={register}
            />
            <FormHelperText
              error={errors && errors.description !== undefined}
              id={`${address.name}.description`}
            >
              {errors &&
                errors.description !== undefined &&
                errors.description.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} />
      </Grid>
    </Accordion>
  );
}

AddressBox.propTypes = {
  title: PropTypes.string,
  address: PropTypes.object,
  errors: PropTypes.any,
  location: PropTypes.array,
  register: PropTypes.any,
  control: PropTypes.any,
  addressValue: PropTypes.any,
  setValue: PropTypes.any,
};

export default AddressBox;
