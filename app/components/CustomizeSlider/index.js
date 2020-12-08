/**
 *
 * CustomizeSlider
 *
 */

import { Slider, withStyles } from '@material-ui/core';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const CustomizedSlider = withStyles({
  // root: {
  //     color: "#52af77",
  //     height: 8
  // },
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
    borderRadius: 4,
  },
})(Slider);
export default CustomizedSlider;
