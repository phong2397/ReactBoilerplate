/**
 *
 * FaqPage
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    border: '0',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
  accordionHeader: {
    backgroundColor: 'rgba(0, 0, 0, .125)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
}));
export function FaqPage() {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <Paper elevation={3} variant="outlined" square>
      <Box m={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Accordion className={classes.root} defaultExpanded square>
              <AccordionSummary
                className={classes.accordionHeader}
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">ĐĂNG KÝ ỨNG LƯƠNG</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Đăng ký ứng lương tiền mặt qua Salary Advance có mất phí
                      không?"
                      secondary=" Bạn không mất phí đăng ký, chỉ cần đăng nhập ứng dụng
                      Salary Advance để tạo hồ sơ ứng lương"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Tôi cần cung cấp những giấy tờ gì để đăng ký ứng lương tiền mặt?"
                      secondary="Giấy tờ bắt buộc cung cấp là Chứng minh nhân dân/Thẻ căn
                      cước và Hộ khẩu. Bạn có thể bổ sung hợp đồng lao động và
                      giấy tờ chứng minh thu nhập (sao kê lương) để hưởng ưu
                      đãi mức phí dịch vụ, hạn mức, kỳ hạn và gia tăng khả
                      năng duyệt ứng lương cao."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Thời gian duyệt ứng lương là bao lâu?"
                      secondary="Trong vòng 48 giờ làm việc (trừ thứ Bảy, Chủ Nhật, ngày
                      lễ tết)."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="
                      Làm thế nào để biết hồ sơ của tôi đã được duyệt?"
                      secondary="Khi hồ sơ được duyệt ứng lương, bạn sẽ nhận được thông
                      báo qua tin nhắn hoặc điện thoại. Bạn cũng có thể kiểm
                      tra trạng thái hồ sơ ứng lương bằng cách: Đăng nhập ứng dụng Salary Advance &gt; chọn “ứng lương
                      tiền mặt” &gt; chọn “Quản lý khoản ứng lương”."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary=" Tôi cần làm gì khi hệ thống báo lỗi trong lúc tạo hồ sơ
                      ứng lương?"
                      secondary="
                      Bạn vui lòng gửi màn hình báo lỗi đến email:
                      hotro@sgfintech.com.vn hoặc gọi số 1900 0000 để được hỗ
                      trợ nhé."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Làm thế nào để hủy hồ sơ ứng lương?"
                      secondary="Nếu muốn hủy hồ sơ ứng lương đã được duyệt, bạn có thể
                      liên hệ trực tiếp với Tổ chức tài chính đã chấp nhận hồ sơ
                      hoặc chờ nhân viên tư vấn liên hệ để thông báo hủy."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="
                      Làm thế nào để biết chi tiết mức phí dịch vụ thực của
                      khoản ứng lương?"
                      secondary="Bạn có thể liên hệ Tổ chức tài chính đã chấp nhận hồ sơ
                      hoặc chờ nhân viên tư vấn liên hệ để tìm hiểu chi tiết."
                    />
                    <Box />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Tôi muốn chỉnh sửa hồ sơ khi đã đăng ký phải làm thế nào?"
                      secondary="Đối với những hồ sơ chưa hoàn tất đăng ký, bạn có thể
                      nhấn nút trở về trên màn hình điện thoại để chỉnh sửa. Đối với những hồ sơ đã hoàn tất đăng ký, bạn vui lòng chờ
                      nhân viên tư vấn của tổ chức tài chính liên hệ để điều
                      chỉnh thông tin. Hoặc, đăng nhập vào ứng dụng Salary
                      Advance, chọn mục “Danh sách yêu cầu” để kiểm tra tổ chức
                      tài chính đang xét duyệt hồ sơ và liên hệ trực tiếp."
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Accordion className={classes.root} defaultExpanded square>
              <AccordionSummary
                className={classes.accordionHeader}
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">GIẢI NGÂN YÊU CẦU</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Tôi sẽ nhận được tiền giải ngân bằng cách nào?"
                      secondary="
                      Từng Tổ chức tài chính sẽ có hình thức giải ngân (nhận
                      tiền yêu cầu) khác nhau. Nhân viên tư vấn sẽ hướng dẫn cụ
                      thể sau khi hồ sơ yêu cầu của bạn được duyệt.
                    "
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary=" Salary Advance có giới hạn hạn mức cho yêu cầu
                    không? "
                      secondary="
                      Salary Advance không phải Tổ chức tài chính cung cấp khoản
                      yêu cầu. Từng Tổ chức tài chính sẽ có những gói yêu cầu
                      khác nhau, tối đa là 80 triệu đồng/gói yêu cầu.
                    "
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Kỳ hạn yêu cầu là bao nhiêu?"
                      secondary="
                      Tùy thuộc Tổ chức tài chính mà kỳ hạn yêu cầu sẽ thay đổi
                      linh hoạt từ 06-60 tháng.
                    "
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary=" Tôi cần làm gì khi số tiền giải ngân tôi sẽ nhận
                    không đúng với khoản yêu cầu trong hồ sơ? "
                      secondary="
                      Khi hồ sơ được duyệt yêu cầu, nhân viên tư vấn sẽ liên hệ
                      xác nhận thông tin hồ sơ yêu cầu (số tiền, kỳ hạn,phí dịch
                      vụ…) để bạn cân nhắc và đưa ra quyết định.
                    "
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Accordion className={classes.root} defaultExpanded square>
              <AccordionSummary
                className={classes.accordionHeader}
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">THANH TOÁN KHOẢN ỨNG LƯƠNG</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Khoản ứng lương của tôi được tính phí như thế nào?"
                      secondary="
                      Hồ sơ ứng lương của bạn được tạo miễn phí trên Salary
                      Advance. Bạn chỉ phải nộp những khoản phí được thông báo
                      trước khi giải ngân bởi Tổ chức tài chính đã duyệt hồ sơ
                      ứng lương của bạn.
                    "
                    />
                  </ListItem>
                  {/* <ListItem>
                    <ListItemText
                      primary="Quá hạn thanh toán bao lâu thì tôi sẽ bị phạt
                    tiền?"
                      secondary="
                      Thời hạn thu hồi nợ, tính phạt đều được ghi rõ trong hợp
                      đồng giữa bạn và Tổ chức tài chính cho ứng lương. Bạn lưu
                      ý đọc kỹ trước khi thực hiện ký nhận nhé.
                    "
                    />
                  </ListItem> */}
                  <ListItem>
                    <ListItemText
                      primary="Tôi có phải chịu phí trả nợ trước hạn không?"
                      secondary="
                      Bạn có thể sẽ phải chịu phí trả nợ trước hạn (từ 2% - 5%)
                      trên số tiền trả trước. Mức phí thay đổi tùy thuộc các Tổ
                      chức tài chính khác nhau.
                    "
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary=" Ngoài số tiền trả góp hàng tháng, tôi có phải đóng
                    thêm phí gì không? "
                      secondary="
                      Bạn chỉ cần trả đúng số tiền đã cam kết thanh toán hàng
                      tháng là yên tâm bạn nhé.
                    "
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Tôi thanh toán khoản ứng lương bằng cách nào?"
                      secondary="
                      Từng Tổ chức tài chính sẽ có hình thức thanh toán khác
                      nhau như có nhân viên đến thu hộ hoặc chuyển khoản qua
                      ngân hàng.
                    "
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Salary Advance cho ứng lương tín chấp hay thế
                    chấp?"
                      secondary="
                      Các khoản ứng lương cung cấp bởi các Tổ chức tài chính đối
                      tác của Salary Advance đều là khoản ứng lương tín chấp.
                      Salary Advance không phải tổ chức trực tiếp cung cấp khoản
                      ứng lương cho bạn nhé!
                    "
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Tôi phải thanh toán mỗi tháng bao nhiêu tiền?"
                      secondary="
                      Khi hoàn tất hồ sơ và trước khi giải ngân, bạn sẽ được ký
                      hợp đồng ứng lương với tổ chức tài chính. Trên hợp đồng
                      này sẽ quy định toàn bộ thông tin về việc trả nợ (như ngày
                      thanh toán, số tiền thanh toán…), bạn vui lòng tham khảo
                      trực tiếp trên hợp đồng để có thông tin chính xác.
                    "
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

FaqPage.propTypes = {
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

export default compose(withConnect)(FaqPage);
