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
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

export function Document({ fileName, img, description }) {
  const base64Image = `data:image/jpeg;base64,${img}`;
  return (
    <div>
      <GridList spacing={1} cols={1}>
        <GridListTile key={fileName} cols={1} rows={1}>
          <img src={base64Image} alt={fileName} />
          <GridListTileBar
            title={fileName}
            titlePosition="top"
            actionIcon={
              <IconButton aria-label={`star ${description}`}>
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
  fileName: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
};

export default memo(Document);
