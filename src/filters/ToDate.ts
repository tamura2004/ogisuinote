import moment from 'moment';

export default function toDate(value: number) {
  moment.locale('ja');
  return moment(value).format('YYYY年M月D日(ddd)');
}
