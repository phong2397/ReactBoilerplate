/**
 *
 * IntroduceBox
 *
 */

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  ChromeReaderMode,
  Description,
  QuestionAnswer,
} from '@material-ui/icons';
import history from 'utils/history';
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #81ecec',
    borderRadius: '10px',
  },
  heading: {
    margin: '0 auto',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardIcon: {
    // border: '1px solid',
    backgroundColor: 'e1fbfb',
    padding: 12,
    fontSize: 72,
    color: theme.palette.primary.main,
    background: '#e1fbfb',
    borderRadius: 10,
    // borderWidth: '80px',
  },
  cardContent: {
    flexGrow: 1,
  },
}));
function IntroduceBox() {
  const classes = useStyles();
  return (
    <div>
      <Box mt={3}>
        <Box
          mt={3}
          fontWeight="fontWeightBold"
          fontSize="h4.fontSize"
          textAlign="center"
        >
          Giới thiệu và hướng dẫn
        </Box>
      </Box>
      <Container className={classes.cardGrid} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item key="card-introduce" xs={12} sm={6} md={4}>
            <Card className={classes.card} variant="outlined">
              <CardHeader
                className={classes.heading}
                align="center"
                avatar={<ChromeReaderMode className={classes.cardIcon} />}
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  <Box fontWeight="fontWeightBold">Giới thiệu sản phẩm</Box>
                </Typography>
                <Typography align="center" variant="body1">
                  Tìm hiểu thêm về ứng tiền mặt
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  size="small"
                  color="primary"
                  onClick={() => {
                    history.push('/yeucau/gioi-thieu');
                  }}
                >
                  Xem thêm {' >'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item key="card-tutorial" xs={12} sm={6} md={4}>
            <Card className={classes.card} variant="outlined">
              <CardHeader
                className={classes.heading}
                align="center"
                avatar={<Description className={classes.cardIcon} />}
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  <Box fontWeight="fontWeightBold">Hướng dẫn</Box>
                </Typography>
                <Typography align="center" variant="body1">
                  Hướng dẫn ứng tiền và nhận giải ngân
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  size="small"
                  color="primary"
                  onClick={() => {
                    history.push('/yeucau/huong-dan');
                  }}
                >
                  Xem thêm{' >'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item key="card-faq" xs={12} sm={6} md={4}>
            <Card className={classes.card} variant="outlined">
              <CardHeader
                className={classes.heading}
                align="center"
                avatar={<QuestionAnswer className={classes.cardIcon} />}
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  <Box fontWeight="fontWeightBold"> Hỏi đáp</Box>
                </Typography>
                <Typography align="center" variant="body1">
                  Câu hỏi thường gặp
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  size="small"
                  color="primary"
                  onClick={() => {
                    history.push('/yeucau/hoi-dap');
                  }}
                >
                  Xem thêm{' >'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

IntroduceBox.propTypes = {};

export default IntroduceBox;
