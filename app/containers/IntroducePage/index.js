/**
 *
 * IntroducePage
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Box, Paper } from '@material-ui/core';
export function IntroducePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <Paper elevation={3} variant="outlined" square>
      <Box m={6}>
        <Box>
          SG Fintech là một hệ thống tài chính dựa trên nền tảng công nghệ
          chuyên cung cấp các giải pháp dịch vụ về tài chính hiệu quả, thuận
          tiện với chi phí thấp hơn so với các dịch vụ và kênh phân phối truyền
          thống. Sự chuyên nghiệp và tính hiệu quả luôn luôn được đề cao trong
          quá trình làm việc của chúng tôi. SG Fintech mong muốn sẽ cung cấp
          những trải nghiệm mang tính đơn giản và liền mạch cho người dùng.
        </Box>

        <Box p={1} fontWeight="fontWeightBold">
          Ứng lương nhanh chóng
        </Box>
        <Box>
          Thời hạn ứng lương bắt đầu từ 03 tháng đến 60 tháng. Người dùng Salary
          Advance có thể dễ dàng, nhanh chóng ứng lương, bạn sẽ được biết thông
          tin yêu cầu khoản ứng và phí dịch vụ minh bạch trước khi điền thông
          tin đăng ký yêu cầu.
        </Box>
      </Box>
    </Paper>
  );
}

IntroducePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(IntroducePage);
