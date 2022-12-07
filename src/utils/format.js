export function numberFormat(number) {
  return Intl.NumberFormat().format(number);
}

export function dateFormat(date) {
  return date.split('T')[0];
}
