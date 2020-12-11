export function convertWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function parseDateString(utcString) {
  return utcString.split('T')[0];
}
