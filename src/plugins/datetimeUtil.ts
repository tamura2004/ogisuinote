import moment from 'moment';

export function daysBefore(n: number): number {
  return moment().startOf('day').subtract(n, 'days').valueOf();
}

export function toTime(minute: number): string {
  return moment()
    .startOf('day')
    .add(minute, 'minute')
    .format('H時mm分');
}
