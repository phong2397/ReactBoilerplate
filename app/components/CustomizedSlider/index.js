/**
 *
 * CustomSlider
 *
 */

import { Slider, withStyles } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const CustomizedSlider = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  markLabel: {
    marginTop: 10,
    top: '-24px',
    '&[data-index="0"]': {
      top: '-48px',
      transform: 'translateX(0%)',
    },
    '&[data-index="1"]': {
      transform: 'translateX(0%)',
      top: '24px',
    },
    '&[data-index="2"]': {
      transform: 'translateX(0%)',
    },
    '&[data-index="3"]': {
      top: '-48px',
      transform: 'translateX(-100%)',
    },
  },
  mark: {
    height: 12,
    width: 2,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 12,
    borderRadius: 4,
  },
  rail: {
    height: 12,
  },
})(Slider);
export default CustomizedSlider;
