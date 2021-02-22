/**
 *
 * CustomStepper
 *
 */

import {
  makeStyles,
  Step,
  StepButton,
  StepConnector,
  StepLabel,
  Stepper,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import history from 'utils/history';
// import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 25,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    color: '#3f51b5',
  },
  completed: {
    color: '#3f51b5',
    fontSize: 18,
  },
  line: {
    borderColor: '#eaeaf0',
    borderTop: '5px dotted green',
  },
})(StepConnector);
function convertStepToPath(step) {
  switch (step) {
    case 0:
      return 'thong-tin-co-ban';
    case 1:
      return 'tai-lieu';
    case 2:
      return 'chon-muc-ung';
    case 3:
      return 'chi-tiet';
    default:
      return '';
  }
}
function CustomStepper({ steps, activeStep }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={() => history.push(convertStepToPath(index))}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    fontSize: 25,
    fontWeight: 'bold',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#20c997',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundColor: '#20c997',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {props.icon}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};
CustomStepper.propTypes = {
  steps: PropTypes.array,
  activeStep: PropTypes.number,
};

export default CustomStepper;
