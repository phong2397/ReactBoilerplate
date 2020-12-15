/**
 *
 * Document
 *
 */

import React, { memo } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

export function Document(props) {
  return (
    <div>
      <GridList spacing={1} cols={1}>
        <GridListTile key={props.imageLink} cols={1} rows={1}>
          <img src={props.imageLink} alt={props.title} />
          <GridListTileBar
            title={props.title}
            titlePosition="top"
            actionIcon={
              <IconButton aria-label={`star ${props.title}`}>
                <StarBorderIcon />
              </IconButton>
            }
            actionPosition="left"
          />
        </GridListTile>
      </GridList>
    </div>
  );
}

Document.propTypes = {
  title: PropTypes.string,
  imageLink: PropTypes.string,
};

export default memo(Document);
