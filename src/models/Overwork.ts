export default class Overwork {
  public static collectionName = 'overworks';

  public static valid(init: any): init is Overwork {
    return typeof init.userId === 'string' &&
      typeof init.date === 'number' &&
      typeof init.managerId === 'string';
  }

  public userId!: string;
  public date!: number;
  public managerId!: string;

  constructor(init: any) {
    if (Overwork.valid(init)) {
      Object.assign(this, init);
    } else {
      alert(`Bad overwork init: ${JSON.stringify(init)}`);
    }
  }
}
