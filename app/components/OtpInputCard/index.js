/**
 *
 * OtpInputCard
 *
 */

import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function OtpInputCard({ OTPLength, resendOTP, ...rest }) {
  const [OTP, setOTP] = useState('');
  return (
    <div
      style={{
        padding: 12,
      }}
    >
      <OtpInput value={OTP} numInputs={OTPLength} onChange={setOTP} {...rest} />
    </div>
  );
}

OtpInputCard.propTypes = {
  OTPLength: PropTypes.number,
  resendOTP: PropTypes.func,
};

export default OtpInputCard;
