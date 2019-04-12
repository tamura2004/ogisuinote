interface Item {
  text: string;
  value: number;
}

export const TIMES: Item[] = [
  {
    text: '30分',
    value: 0.5,
  },
  {
    text: '1時間',
    value: 1,
  },
  {
    text: '1時間30分',
    value: 1.5,
  },
  {
    text: '2時間',
    value: 2,
  },
  {
    text: '3時間',
    value: 3,
  },
  {
    text: '4時間',
    value: 4,
  },
  {
    text: '5時間',
    value: 5,
  },
  {
    text: '6時間',
    value: 6,
  },
  {
    text: '7時間',
    value: 7,
  },
  {
    text: '8時間',
    value: 8,
  },
];

export const TimeDic = new Map<number, string>();

for (const item of TIMES) {
  TimeDic.set(item.value, item.text);
}
