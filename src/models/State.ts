import Task from '@/models/Task';

export default class State {
  public tasks: Map<string, Task> = new Map<string, Task>();
  public user: any = null;
  public processing: boolean = false;
}
