/**
 *
 * TutorialPage
 *
 */

import { Box, Paper, Typography, Button, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
const useStyles = makeStyles(() => ({
  content: {
    fontWeight: 500,
  },
  title: {
    fontWeight: 600,
    marginTop: 5,
  },
  buttonTop: {
    borderRadius: 5,
    backgroundColor: '#FFA500',
  },
  buttonBot: {
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
}));
export function TutorialPage() {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <Paper elevation={3} variant="outlined" square>
      <Box m={6} component="div">
        <Typography variant="h5" component="h5">
          <b> I. Hướng dẫn nhận yêu cầu ứng trước lương và giải ngân</b>
        </Typography>
        <Box className={classes.title}>
          <b>*</b> Đối với khách hàng mới:
        </Box>
        <Box className={classes.content}>Điền thông tin cá nhân</Box>
        <Box className={classes.content}>Hoàn tất hồ sơ tài liệu</Box>
        <Box className={classes.content}>
          {
            "Bạn vui lòng chọn mức lương. Sau khi hoàn tất, click nút 'NHẬN KHOẢN TẠM ỨNG'"
          }
        </Box>
        <Box className={classes.content}>Chờ được xét duyệt thành công</Box>
        <Box className={classes.content}>Nhận tiền ngay qua tài khoản</Box>
        <Button variant="contained" className={classes.buttonTop}>
          <b>ĐĂNG KÝ</b>
        </Button>
        <Box className={classes.title}>
          <b>*</b> Đối với khách hàng cũ:
        </Box>
        <Box className={classes.content}>
          Bạn vui lòng đăng nhập tài khoản cá nhân của mình
        </Box>
        <Box className={classes.content}>
          Chọn mức ứng lương mong muốn và gửi yêu cầu
        </Box>
        <Box className={classes.content}>Chờ được xét duyệt và thành công</Box>
        <Box className={classes.content}>Nhận tiền ngay qua tài khoản</Box>
        <Button variant="contained" className={classes.buttonBot}>
          <b>ĐĂNG NHẬP</b>
        </Button>
      </Box>
    </Paper>
  );
}

TutorialPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect)(TutorialPage);
