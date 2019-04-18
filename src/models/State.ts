import Task from '@/models/Task';
import User from '@/models/User';
import Config from '@/models/Config';
import moment from 'moment';

export default class State {
  public tasks: Map<string, Task> = new Map<string, Task>();
  public users: Map<string, User> = new Map<string, User>();
  public config: Map<string, Config> = new Map<string, Config>();
  public user: any = null; // current login user
  public wait: boolean = false;
  public date: number = 0;

  constructor() {
    this.date = moment().startOf('day').valueOf();
  }
}
