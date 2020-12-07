/**
 *
 * Question
 *
 */

import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Question() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component="nav">
      <ListItem
        button
        component={Link}
        to="/faq/question/1"
        onClick={handleClick}
      >
        <ListItemText primary="Câu hỏi" />
        <ArrowForwardIos />
      </ListItem>
      <Divider />
    </List>
  );
}

Question.propTypes = {};

export default Question;
