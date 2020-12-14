export function formatInitStage(data) {
  const orderIdCustom = `0000000${data.orderId}`;
  return {
    orderId: `#${orderIdCustom.substring(orderIdCustom.length - 6)}`,
    status: 'INIT',
    orderAmount: data.orderAmount,
    submitTime: data.submitTime,
  };
}

export function formatAppraisalStage(data) {
  return {
    status: data.approveStatus,
    approveTime: data.approveTime,
  };
}

export function formatDisbursementStage(data) {
  return {
    status: data.disburseStatus,
    accountName: data.accName,
    accountNo: data.bankAcc,
    bankName: data.bankName,
  };
}

export function formatRepaymentStage(data) {
  return {
    status: data.repayStatus,
    repayTime: data.repayTime,
  };
}
