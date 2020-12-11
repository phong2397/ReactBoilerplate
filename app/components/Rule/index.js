/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    color: 'black',
    backgroundColor: '#FCF6F6',
    position: 'absolute',
    top: '10%',
    left: '10%',
    overflow: 'scroll',
    height: '90%',
    display: 'block',
    width: '90%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function ShowRule() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Container component="main" maxWidth="sm">
        <Typography variant="h5" align="center">
          Điều khoản sử dụng
        </Typography>

        <List>
          {data.map(q => (
            <div key={q.id}>
              <ListItem>
                <ListItemText primary={`${q.id}. ${q.name}`} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>

        <Typography variant="h5" align="center">
          <Button
            align="center"
            variant="contained"
            onClick={handleClose}
            className={classes.button}
          >
            Trờ lại
          </Button>
        </Typography>
      </Container>
    </div>
  );

  return (
    <div>
      <Checkbox name="checkedB" color="primary" />
      Tôi chấp nhận <Link onClick={handleOpen}>điều khoản</Link>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
const data = [
  {
    id: 1,
    name:
      'Đối với khoản vay mua hàng hóa, dịch vụ (TW, CD hoặc sản phẩm tương tự), Salary Advance sẽ giải ngân trực tiếp vào tài khoản của Bên Bán.',
  },
  {
    id: 2,
    name:
      'Đối với số tiền vay để thanh toán phí Bảo hiểm, Bên vay chỉ định Salary Advance thanh toán trực tiếp cho Công ty Bảo hiểm.',
  },
  {
    id: 3,
    name:
      'Khi đến hạn thanh toán mà Bên vay không trả hoặc trả không đầy đủ nợ gốc và/hoặc lãi tiền vay, ngoài số tiền lãi vay trong hạn theo thỏa thuận.',
  },
  {
    id: 4,
    name:
      'Tiền lãi đối với dư nợ gốc bị chuyển nợ quá hạn được tính trên Lãi suất quá hạn nợ gốc được quy định tại Hợp đồng tín dụng và hoặc Thông báo cho vay kiêmLịch trả nợ , số dư nợ gốc bị quá hạn và khoảng thời gian từ ngày tiếp theo ngày đến hạn thanh toán đến ngày khoản nợ gốc được Bên vay thanh toán đầy đủ.',
  },
  {
    id: 5,
    name:
      'Tiền lãi đối với số tiền lãi trong hạn chưa thanh toán được tính trên Lãi suất quá hạn nợ lãi được quy định tại Hợp đồng tín dụng và/hoặcThông báo cho vay kiêm Lịch trả nợvà thời gian chậm trả.',
  },
  {
    id: 6,
    name:
      'Khi thanh toán, Bên vay cần lưu trữ các chứng từ thanh toán để làm cơ sở giải quyết khiếu nại hoặc tranh chấpxảy ra (nếu có).',
  },
  {
    id: 7,
    name:
      'Mọi trường hợp chậm thanh toán do lỗi của các Bên Thứ Ba khác trong quá trình thanh toán khoản vay đều không miễn trừ nghĩa vụ của Bên vay cũng như làm ảnh hưởng đến các quyền của VPB FC theo Hợp đồng tín dụng.',
  },
  {
    id: 8,
    name:
      'Trường hợp Bên vay thanh toán nhiều hơn Khoản trả hàng tháng nhưng không đủ để trả nợ toàn bộ khoản vay, số tiền chênh lệch này sẽ được VPB FC hỗ trợ quản lý không trả lãi và được dùngđể thanh toán các Khoản trả hàng tháng của (các) kỳ tiếp theo vào ngày đến hạn thanh toán.',
  },
  {
    id: 9,
    name: 'Thanh toán đầy đủ số kỳ thanh toán tối thiểu phải hoàn thành.',
  },
  {
    id: 10,
    name:
      'Salary Advance có quyền đơn phương chấm dứt cho vay và thu hồi toàn bộ khoản nợ trước hạn khi phát hiện Bên vay cung cấp thông tin sai sự thật, vi phạm các thỏa thuận tại Hợp đồng tín dụng và Bản Điều khoản Điều kiệnnày và/hoặc các văn bản thỏa thuận khác liên quan đến khoản vay phát sinh (nếu có).',
  },
  {
    id: 11,
    name:
      'Gửi tin nhắn và/hoặc gọi vào các số điện thoạivà/hoặc tài khoản mạng xã hội của Bên vay cung cấp và/hoặc tài khoản mạng xã hội của Bên vay do VPB FC thu thập được  trong thời gian pháp luật cho phép để nhắc Bên vay về ngày và số tiền thanh toán hoặc yêu cầu thanh toán nợ đến hạn và quá hạn.',
  },
  {
    id: 12,
    name:
      'Gửi tin nhắn và/hoặc gọi vào các số điện thoạivà/hoặc các tài khoản mạng xã hội màBên vay cung cấp cho Salary Advance thu thập được, bao gồm cả người thân, đồng nghiệp của Bên vay, trong thời gian pháp luật cho phép để tìm kiếm sự hỗ trợ về thông tin của Bên vay hoặc hỗ trợ truyền đạt thông tin thanh toán đến Bên vay.',
  },
  {
    id: 13,
    name: 'Thực hiện các thủ tục tố tụng theo quy định của pháp luật.',
  },
  {
    id: 14,
    name:
      'Khoản vay theo Hơp đồng tín dụng và Bản Điều khoản điều kiện này không được cơ cấu lại thời hạn trả nợ, trừ trường hợp Salary Advance chấp thuận bằng văn bản.',
  },
];
