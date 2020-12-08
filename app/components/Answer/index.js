/**
 *
 * Answer
 *
 */

import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function find(id) {
  // eslint-disable-next-line eqeqeq
  return data.find(q => q.id == id);
}

const data = [
  {
    id: 1,
    question: 'Tài chính lương là gì?',
    answer:
      'Tài chính lương là một nền tảng tài chính toàn cầu tập trung vào việc giải quyết nguyên nhân gốc rễ của căng thẳng tài chính: sự thiếu tiết kiệm của nhân viên, gây ra bởi mức nợ cá nhân lãi suất cao. Với Tài chính Lương, nhân viên trả các khoản nợ hiện có của họ (như thẻ tín dụng hoặc các khoản vay ngắn hạn) bằng cách thay thế chúng bằng một khoản vay nhân viên lãi suất thấp duy nhất được hoàn trả trực tiếp từ phiếu lương của họ. Vì việc hoàn trả được thực hiện tự động thông qua khấu trừ tiền lương, nên việc thực hiện và quản lý liên tục rất dễ dàng. Nhóm Tài chính tiền lương cũng là đối tác của bạn trong việc gắn kết nhân viên để giúp đảm bảo rằng bạn đang tiếp cận những nhân viên cần nhất trong tổ chức của mình.',
  },
  {
    id: 2,
    question:
      'Tài chính lương sẽ hoạt động như thế nào với hệ thống tính lương của nhân viên??',
    answer:
      'Tài chính lương tích hợp trực tiếp với hệ thống tính lương của bạn. Hoặc, nó có thể tích hợp với hệ thống Chấm công.',
  },
  {
    id: 3,
    question: 'Sản phẩm có thu phí không?',
    answer:
      'Chúng tôi không thu bất kỳ khoản phí nộp đơn, xuất phát hoặc trả nợ trước hạn nào cho nhân viên.',
  },
  {
    id: 4,
    question: 'Lãi suất là bao nhiêu?',
    answer:
      'Lãi suất của chúng tôi dao động từ 5,0% đến 7,0% , cố định trong suốt thời hạn của khoản vay. Mô hình đa tỷ lệ của chúng tôi được thiết kế để có tính toàn diện nhất trên thị trường và mang lại giá trị cho những người nộp đơn có nhiều loại thu nhập và hồ sơ người vay.',
  },
  {
    id: 5,
    question: 'Làm thế nào để nhân viên tiếp cận Tài chính tiền lương?',
    answer:
      'Nhân viên đăng ký các khoản vay và truy cập Trung tâm Sức khỏe Tài chính của họ thông qua một đường dẫn dành riêng được thiết lập cho công ty của bạn.',
  },
  {
    id: 6,
    question:
      'Nỗ lực triển khai và quản lý Tài chính lương đang diễn ra là gì?',
    answer:
      'Chúng tôi đầu tư rất nhiều vào công nghệ và thành công của khách hàng để đảm bảo nền tảng của chúng tôi: Có thể thích ứng với quy trình trả lương nội bộ của công ty bạn; Yêu cầu càng ít công việc càng tốt từ bảng lương đến khởi chạy và quản lý (số phút cho mỗi chu kỳ trả lương); Cho phép nhân viên quản lý hoàn toàn các khoản vay của họ trực tiếp với Tài chính tiền lương mà không cần sự tham gia của người sử dụng lao động; Vượt qua các yêu cầu bảo mật thông tin nghiêm ngặt nhất.',
  },
  {
    id: 7,
    question:
      'Điều gì xảy ra nếu một nhân viên không có khả năng trả nợ hoặc rời bỏ chủ lao động?',
    answer:
      'Tài chính tiền lương cực kỳ linh hoạt và được thiết kế để đảm bảo trải nghiệm tối ưu, đồng cảm cho nhân viên và nhà tuyển dụng mọi lúc. Điều này bao gồm việc cung cấp các kỳ nghỉ thanh toán (hoặc các giải pháp tương tự), chuyển đổi liền mạch sang và từ các phương thức trả nợ cho nhân viên nghỉ việc và duy trì sự nhạy cảm rất lớn đối với bất kỳ thay đổi nào trong hoàn cảnh của nhân viên trong quá trình hoàn trả khoản vay của họ.',
  },
  {
    id: 8,
    question:
      'Có các khoản phí bổ sung cho dịch vụ tài chính tiền lương không? ',
    answer:
      ' Không. Nhân viên có thể thanh toán hóa đơn, chuyển tiền và sử dụng công cụ lập ngân sách và tiết kiệm hoàn toàn miễn phí.',
  },
  {
    id: 9,
    question:
      'Tài chính tiền lương có phải là nhà cung cấp dịch vụ cho vay tiêu dùng không?',
    answer:
      'Tài chính nhà cung cấp giải pháp công nghệ tài chính. Nó không phải là một giải pháp tín dụng.',
  },
  {
    id: 10,
    question:
      'Dữ liệu được cung cấp cho Tài chính tiền lương bảo mật như thế nào ?',
    answer:
      'Tất cả dữ liệu được lưu trữ trên đám mây. Dữ liệu được mã hóa ở trạng thái nghỉ và khi vận chuyển. Các tiêu chuẩn PCI được sử dụng để duy trì mức độ bảo mật dữ liệu cao nhất.',
  },
  {
    id: 11,
    question: 'Có phải Tài chính lương là Payday Loan?',
    answer:
      ' Không, hoàn toàn ngược lại. Ứng trước cho phép bạn truy cập số tiền bạn đã kiếm được trước ngày lĩnh lương. Đó là tiền của bạn khi bạn cần.',
  },
  {
    id: 12,
    question: 'Tôi có thể xóa tài khoản của tôi được không ?',
    answer:
      'Hãy điền form bên dưới; và chúng tôi có thể xóa bạn ngay lập tức khỏi bất kỳ thông tin tiếp thị nào. Tùy thuộc vào trạng thái tài khoản của bạn, chúng tôi buộc phải giữ thông tin của bạn trong các khoảng thời gian khác nhau. Chúng tôi sẽ cho bạn biết chi tiết chính xác cho tài khoản của bạn.',
  },
  {
    id: 13,
    question: 'Làm cách nào tôi có thể đặt lại mật khẩu?',
    answer:
      " Nhập tên công ty của bạn . Sau đó, bạn sẽ được dẫn đến một trang dành riêng cho chủ nhân của bạn. Đi tới phía trên cùng bên phải của trang đó và nhấp vào 'Đăng nhập'. Nhập địa chỉ email bạn đã sử dụng để đăng ký và nhấp vào 'Bạn gặp sự cố khi đăng nhập?'. Làm theo hướng dẫn trên màn hình và bạn sẽ nhận được một liên kết qua email để đặt lại mật khẩu của mình. Xin lưu ý rằng điều này sẽ hết hạn sau một giờ, vì vậy hãy đảm bảo rằng bạn có thể hoàn tất việc đặt lại mật khẩu trong thời gian này.",
  },
  {
    id: 14,
    question: 'Làm thế nào tôi có thể thay đổi số tài khoản ngân hàng?',
    answer:
      ' Vui lòng điền vào biểu mẫu bên dưới cho chúng tôi biết số lượng và thời gian tốt nhất từ 9 giờ sáng đến 5 giờ chiều để liên hệ với bạn. Sau đó, chúng tôi sẽ liên hệ lại với bạn để chúng tôi có thể cập nhật những chi tiết này trên tài khoản Tài chính Lương của bạn.',
  },
  {
    id: 15,
    question: 'Làm thế nào tôi có thể kiểm tra trạng thái đơn vay ?',
    answer:
      ' Đăng nhập vào tài khoản của bạn để xem trạng thái mới nhất của đơn đăng ký - nếu bạn cần làm bất kỳ điều gì, chúng tôi sẽ gửi email cho bạn và yêu cầu bạn đăng nhập để xem bạn cần thực hiện hành động nào.',
  },
  {
    id: 16,
    question: 'Tôi có thể vay bao nhiêu tiền lương của mình?',
    answer:
      'Không có công thức thiết lập nào để tính số tiền bạn được vay. Tuy nhiên, nó chủ yếu phụ thuộc vào thu nhập hàng tháng của bạn. Trong khi xử lý đơn xin vay trước lương của bạn, ngân hàng hoặc người cho vay sẽ kiểm tra xem bạn có đủ tiền để trả các khoản trả góp hàng tháng tương đương (EMI) hay không. Trước tiên, ngân hàng hoặc người cho vay sẽ kiểm tra xem số tiền EMI có thấp hơn 50% lương hiện có của bạn hay không. Thứ hai, nó sẽ kiểm tra xem bạn có bất kỳ khoản vay nào đang diễn ra hay không. ',
  },
  {
    id: 17,
    question:
      'Làm cách nào để đăng ký số điện thoại di động cho ứng dụng Tài chính lương ?',
    answer:
      'Bạn phải chỉ ra chính xác số điện thoại di động “Đang hoạt động”. Lưu ý quan trọng: Xin lưu ý rằng việc chia sẻ số điện thoại di động không được phép và bất kỳ sự sai lệch / khác biệt nào về số điện thoại di động có thể gây ra sự chậm trễ trong quá trình xử lý.',
  },
  {
    id: 18,
    question: 'Khi nào tôi nhận được khoản vay?',
    answer:
      'Sau khi bạn đã gửi cho chúng tôi thông tin chi tiết về ngân hàng và ký hợp đồng vay, chúng tôi sẽ có thể gửi số tiền vay cho bạn.',
  },
  {
    id: 19,
    question: 'Bạn có thể mượn nhiều lần được không?',
    answer:
      'Không. Bạn chỉ có thể mượn một khoản vay và thanh toán hết khoản vay cũ.',
  },
  {
    id: 20,
    question: 'Làm cách nào để trả nợ ?',
    answer:
      'Các khoản hoàn trả khoản vay Tài chính Lương thường được thực hiện trực tiếp từ tiền lương của bạn. Nếu vì bất kỳ lý do gì mà chúng tôi không thể nhận thanh toán trực tiếp từ lương của bạn, chúng tôi sẽ bắt đầu thu các khoản thanh toán bằng Ghi nợ Trực tiếp với cùng một mức lãi suất. Bạn có thể hoàn trả khoản vay đầy đủ hoặc thanh toán bổ sung bất kỳ lúc nào mà không mất phí.',
  },
];

// TODO: get Answer is a JSON object with {id, question, answer}
function Answer() {
  const { id } = useParams();
  const history = useHistory();
  const item = find(id);
  const backFunc = () => {
    history.push('/faq');
  };
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Câu hỏi #{id}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {item.question}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {item.answer}
      </Typography>

      <Button variant="contained" onClick={backFunc}>
        Trờ lại
      </Button>
    </div>
  );
}

Answer.propTypes = {};

export default memo(Answer);
