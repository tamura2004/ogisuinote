export default class Task {
  public static collectionName = 'tasks';

  public static form(): Form<Task> {
    return {
      userId: null,
      date: null,
      priority: null,
      name: null,
      plan: null,
      actual: null,
      memo: '',
    };
  }

  public static valid(init: Form<Task>): init is Task {
    return typeof init.userId === 'string' &&
      typeof init.date === 'string' &&
      typeof init.priority === 'string' &&
      typeof init.name === 'string' &&
      typeof init.plan === 'number';
  }

  public userId!: string;
  public date!: string;
  public priority!: string;
  public name!: string;
  public plan!: number;
  public actual!: number;
  public memo!: string;

  constructor(init: Partial<Task>) {
    Object.assign(this, init);
  }
}
