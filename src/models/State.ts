import Task from '@/models/Task';
import User from '@/models/User';
import Config from '@/models/Config';
import moment from 'moment';
import { db, listen, listenUser } from '@/plugins/firebase';

export default class State {
  public tasks: Map<string, Task> = new Map<string, Task>();
  public users: Map<string, User> = new Map<string, User>();
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
