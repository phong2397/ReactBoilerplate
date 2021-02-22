/**
 *
 * Footer
 *
 */

import {
  Box,
  Container,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Email, Language, Phone } from '@material-ui/icons';
import React from 'react';
import LogoDT from 'images/scb-logo.png';
import LogoAws from 'images/aws.png';
import LogoCCDV from 'images/logoCCDV.png';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
  footerFirst: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  footerSeccond: {
    backgroundColor: theme.palette.background.dark,
    // color: theme.palette.background.dark.contrastText,
    padding: theme.spacing(6),
  },
}));
function Footer() {
  const classes = useStyles();
  return (
    <div>
      <Paper
        elevation={3}
        variant="outlined"
        square
        className={classes.footerFirst}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" align="left" gutterBottom>
                <Box fontWeight="fontWeightBold">LIÊN HỆ</Box>
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                align="left"
              >
                <Box flexDirection="row">
                  <Email fontSize="small" />
                  <span style={{ padding: 10 }}>hotro@sgfintech.com.vn</span>
                </Box>
                <Box flexDirection="row">
                  <Phone fontSize="small" />
                  <span style={{ padding: 10 }}>(+84) 1900 9999</span>
                </Box>
                <Box flexDirection="row">
                  <Language fontSize="small" />
                  <span style={{ padding: 10 }}>salaryadvance.com.vn</span>
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="right"
              >
                <Box fontWeight="fontWeightBold">
                  Ứng lương tại Salary Advance hỗ trợ nhanh chóng nhu cầu tiêu
                  dùng. Là đơn vị trung gian, Salary Advance giúp người dùng ứng
                  lương nhanh thông qua các đối tác tài chính cho Ứng uy tín.
                  Thông tin đăng ký ứng lương sẽ được Salary Advance giải ngân
                  nhanh chóng. Hãy bắt đầu đăng ký ứng lương tại Salary Advance.
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" align="left" gutterBottom>
                <Box fontWeight="fontWeightBold">ĐỐI TÁC</Box>
              </Typography>
              <Box>
                <Box
                  component="span"
                  border={0.5}
                  p={1}
                  ml={1}
                  style={{
                    display: 'inline-block',
                    border: '1px solid #81ecec',
                    borderRadius: '3px',
                  }}
                >
                  <img
                    src={LogoDT}
                    alt="sgft-logo"
                    style={{
                      height: 30,
                    }}
                  />
                </Box>
                <Box
                  component="span"
                  border={0.5}
                  p={1}
                  ml={1}
                  style={{
                    display: 'inline-block',
                    border: '1px solid #81ecec',
                    borderRadius: '3px',
                  }}
                >
                  <img
                    src={LogoAws}
                    alt="sgft-logo"
                    style={{
                      height: 30,
                    }}
                  />
                </Box>
              </Box>

              {/* <Box border={1} component="span">
                
              </Box> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                style={{
                  display: 'block',
                  float: 'right',
                }}
              >
                <Typography variant="h6" align="right" gutterBottom>
                  <Box fontWeight="fontWeightBold">CHỨNG NHẬN</Box>
                </Typography>
                <img
                  src={LogoCCDV}
                  alt="bcct-logo"
                  style={{
                    height: 60,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <footer className={classes.footerSeccond}>
        <Container>
          <Typography variant="subtitle2" color="textSecondary" align="right">
            <Box color="background.contrastText" fontWeight="fontWeightBold">
              <Box>
                {'Copyright © '}
                <Link color="inherit" href="http://www.sgfintech.com.vn/">
                  Sgfintech
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Box>
              <Box>
                Địa chỉ: 66 Phó Đức Chính, Nguyễn Thái Bình, Quận 1, Tp.HCM
              </Box>
              <Box>Email: sgfintech@com.vn</Box>
            </Box>
          </Typography>
        </Container>
      </footer>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
