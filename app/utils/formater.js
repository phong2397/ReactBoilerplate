export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatDate(dateObject) {
  if (!dateObject) return '';
  const { date, time } = dateObject;
  const { year, month, day } = date;
  const { hour, minute, second } = time;
  function n2digit(n) {
    const nString = `00${n}`;
    return nString.slice(nString.length - 2, nString.length);
  }
  const dateString = `${n2digit(day)}-${n2digit(month)}-${year}`;
  const timeString = `${n2digit(hour)}:${n2digit(minute)}:${n2digit(second)}`;
  return `${dateString} ${timeString}`;
}

export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}
