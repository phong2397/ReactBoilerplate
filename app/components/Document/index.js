/**
 *
 * Document
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  media: {
    width: '100%',
    height: 240,
  },
}));
const convertDocumentType = id => {
  switch (id) {
    case 0:
      return 'Giấy tờ khác';
    case 1:
      return 'CMND/CCCD';
    case 2:
      return 'BHYT/BHXH';
    case 3:
      return 'GPLX';
    case 4:
      return 'HDLD';

    default:
      break;
  }
  return 'Unknow';
};
export function Document({ fileName, img, description, documentType }) {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          src={`data:image/png;base64, ${img}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {fileName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            {convertDocumentType(documentType)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Document.propTypes = {
  fileName: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  documentType: PropTypes.any,
};

export default memo(Document);
