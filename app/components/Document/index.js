/**
 *
 * Document
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
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
  return 'Unknown';
};
function handleOpenImageNewTab(img) {
  const base64ImageData = `data:image/png;base64, ${img}`;
  const contentType = 'image/png';
  const byteCharacters = atob(
    base64ImageData.substr(`data:${contentType};base64,`.length),
  );
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  const blobUrl = URL.createObjectURL(blob);

  window.open(blobUrl, '_blank');
}
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
      <CardActions>
        <Button
          variant="contained"
          color="default"
          onClick={() => handleOpenImageNewTab(img)}
        >
          Xem chi tiết
        </Button>
      </CardActions>
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
