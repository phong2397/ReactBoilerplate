/**
 *
 * PhoneInput
 *
 */

import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function PhoneInput(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
      ]}
    />
  );
}

PhoneInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default PhoneInput;
