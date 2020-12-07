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

export function Document({ title, imageLink }) {
  return (
    <div>
      <GridList cellHeight={200} spacing={1} cols={1}>
        <GridListTile key={imageLink} cols={1} rows={1}>
          <img src={imageLink} alt={title} />
          <GridListTileBar
            title={title}
            titlePosition="top"
            actionIcon={
              <IconButton aria-label={`star ${title}`}>
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
