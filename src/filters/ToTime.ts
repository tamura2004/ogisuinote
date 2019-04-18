export default function  toTime(value: number | null) {
  if (value === null || value === 0) {
    return 'なし';
  } else {
    const hour = Math.floor(value);
    const minute = (value - hour) * 60;
    let str = '';
    if (hour !== 0) {
      str += `${hour}時間`;
    }
    if (minute !== 0) {
      str += `${minute}分`;
    }
    return str;
  }
}
