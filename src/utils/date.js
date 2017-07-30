// dependencies
// import moment from 'moment';

export function sameDate(date1, date2, precise = false) {
  return !date1.diff(date2, 'days', precise);
}

export function sameTime(date1, date2, precise = true) {
  return !date1.diff(date2, 'minutes', precise);
}

export function sameHour(date1, date2) {
  return date1.hour() === date2.hour();
}

export function isBeforeTime(date1, date2, precise = true) {
  return date1.diff(date2, 'minutes', precise) < 0;
}
