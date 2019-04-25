export default class Shift {
  public static collectionName: string = 'shifts';

  public static valid(init: any): init is Shift {
    return typeof init.userId === 'string' &&
      typeof init.successorId === 'string' &&
      typeof init.date === 'number' &&
      typeof init.startTime === 'number';
  }

  public userId!: string;
  public successorId!: string;
  public date!: number; // unix milliseconds
  public startTime!: number; // start time of work by minute ex) 8:40 -> 520 (min)

  constructor(init: any) {
    if (Shift.valid(init)) {
      Object.assign(this, init);
    } else {
      alert(`Bad shift init: ${JSON.stringify(init)}`);
    }
  }
}
