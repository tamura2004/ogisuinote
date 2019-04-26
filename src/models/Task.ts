export default class Task {
  public static collectionName = 'tasks';

  public static form(): Form<Task> {
    return {
      userId: null,
      date: null,
      priority: '中',
      name: null,
      plan: 0,
      actual: null,
      memo: null,
    };
  }

  public static valid(init: any): init is Task {
    return typeof init.userId === 'string' &&
      typeof init.date === 'number' &&
      typeof init.priority === 'string' &&
      typeof init.name === 'string' &&
      typeof init.plan === 'number' &&
      (typeof init.actual === 'number' || init.actual === null) &&
      (typeof init.memo === 'string' || init.memo === null);
  }

  public userId!: string;
  public date!: number; // unix time (milliseconds)
  public priority!: string;
  public name!: string;
  public plan!: number;
  public actual!: number | null;
  public memo!: string | null;

  constructor(init: any) {
    if (Task.valid(init)) {
      Object.assign(this, init);
    } else {
      alert(`bad task init: ${JSON.stringify(init)}`);
    }
  }
}
