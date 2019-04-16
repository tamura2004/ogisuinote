import Task from '@/models/Task';
import moment from 'moment';

export default class State {
  public tasks: Map<string, Task> = new Map<string, Task>();
  public user: any = null;
  public wait: boolean = false;
  public date: number = 0;

  constructor() {
    this.date = moment().startOf('day').valueOf();
  }
}
