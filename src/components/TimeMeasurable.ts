import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import moment from 'moment';

@Component
export default class TimeMeasurable extends Vue {
  @Prop() private userId!: string;

  private get userName() {
    return this.$store.getters.userName(this.userId);
  }

  private get date() {
    return this.$store.getters.date;
  }

  private get tasks(): Array<[string, Task]> {
    return this.$store.getters.tasks(this.userId, this.date);
  }

  private get plan() {
    return this.tasks
      .map(([, task]) => task.plan)
      .reduce((a, plan) => a + plan, 0);
  }

  private get overwork(): number {
    return this.plan < 7.5 ? 0 : this.plan - 7.5;
  }

  private get lasttime(): string {
    return moment()
      .startOf('day')
      .add(17, 'hour')
      .add(10, 'minute')
      .add(this.overwork, 'hour')
      .format('H時mm分');
  }
}
