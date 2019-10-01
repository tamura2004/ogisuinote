import User from '@/models/User';
import Task from '@/models/Task';
import Shift from '@/models/Shift';
import Overwork from '@/models/Overwork';

export default class State {
  public tasks: Map<string, Task> = new Map<string, Task>();
  public users: Map<string, User> = new Map<string, User>();
  public shifts: Map<string, Shift> = new Map<string, Shift>();
  public overworks: Map<string, Overwork> = new Map<string, Overwork>();
  public user: any = null; // current login user
  public wait: boolean = false;
  public date: number = 0;
}
