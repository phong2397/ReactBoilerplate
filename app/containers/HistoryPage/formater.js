import { convertWithCommas } from '../../utils/formater';
const ORDER_STATUS = {
  wait: 'Đang chờ xác nhận',
  wfs: 'Đang chờ giải ngân',
  act: 'Đã giải ngân',
  deni: 'Đơn bị từ chối',
};

function formatOrderObject(order) {
  const orderIdCustom = `0000000${order.orderId}`;
  return {
    orderId: order.orderId,
    orderIdDisplay: `#${orderIdCustom.substring(orderIdCustom.length - 6)}`,
    orderStatus: ORDER_STATUS[order.orderStatus],
    orderAmount: `${convertWithCommas(order.orderAmount)} đ`,
    submitTime: order.submitTime
      .replace('T', ' ')
      .replace('Z', '')
      .replace('.000', ''),
  };
}

export function formatListOrders(orders) {
  console.log('FORMAT ORDERS: ', orders);
  return orders.map(order => formatOrderObject(order));
}
