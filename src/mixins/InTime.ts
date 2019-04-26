import moment from 'moment';

export function inTime(date: number): boolean {
  return moment().isBefore(moment(date).startOf('day').add(12, 'hour'));
}
