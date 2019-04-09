import Task from '@/models/Task';

export default class State {
  public tasks: Map<string, Task> = new Map<string, Task>();
  public userId: string = 'abc';
}
