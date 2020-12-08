/**
 *
 * LoginForm
 *
 */

import React, { memo } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function LoginForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    props.handleSubmit(data);
    e.target.reset();
  };
  const onError = error => {
    console.log(error);
  };

  return (
    <Box width={1}>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={!!errors[props.name]}
          name={props.name}
          inputRef={register({
            required: `${props.errorMessage} không để trống`,
          })}
          helperText={errors[props.name] && errors[props.name].message}
          label={props.label}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          {props.buttonLabel}
        </Button>
      </form>
    </Box>
  );
}

LoginForm.propTypes = {
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  buttonLabel: PropTypes.string,
  label: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default memo(LoginForm);
