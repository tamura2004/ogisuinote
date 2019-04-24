import User from '@/models/User';
import Task from '@/models/Task';
import Shift from '@/models/Shift';
import Config from '@/models/Config';
import moment from 'moment';
import { db } from '@/plugins/firebase';

export default class State {
  public tasks: Map<string, Task> = new Map<string, Task>();
  public users: Map<string, User> = new Map<string, User>();
  public shifts: Map<string, Shift> = new Map<string, Shift>();
  public config: Config | null = null;
  public user: any = null; // current login user
  public wait: boolean = false;
  public date: number = 0;

  constructor() {
    this.date = moment().startOf('day').valueOf();
    db.collection('config').doc('SF40rYUyFHPUjbRFVmue').get().then((doc: any) => {
      this.config = doc.data();
    }).catch((err) => alert(err));
  }
}
