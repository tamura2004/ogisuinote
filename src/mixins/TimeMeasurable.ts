import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import moment from 'moment';

@Component
export default class TimeMeasurable extends Vue {
  @Prop() private userId!: string;

  private get owner() {
    return this.userId === this.$store.getters.userId;
  }

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

  private get overworkId() {
    return this.$store.getters.overworkId(this.userId, this.date);
  }

  private get shiftId() {
    return this.$store.getters.shiftId(this.userId, this.date);
  }

  private get shift() {
    return this.$store.getters.shift(this.userId, this.date);
  }

  private get successorName() {
    if (!this.shift) {
      return '-';
    }
    const userId = this.shift.successorId;
    const user = this.$store.getters.user(userId);
    return user ? user.name : '-';
  }

  private toTime(minute: number): string {
    return moment()
      .startOf('day')
      .add(minute, 'minute')
      .format('H時mm分');
  }

  private get startTimeByMinute(): number {
    return this.shift ? this.shift.startTime : 520;
  }

  private get startTime(): string {
    if (!!this.shift) {
        return this.toTime(this.shift.startTime);
    } else {
      return '8時40分';
    }
  }

  private get onTimeByMinute(): number {
    return this.shift ? this.shift.startTime + 510 : 1030;
  }

  private get lastTimeByMinute(): number {
    return this.onTimeByMinute + this.overwork * 60;
  }

  private get lasttime(): string {
    if (!!this.shift) {
      return this.toTime(this.shift.startTime + (8.5 + this.overwork) * 60);
    } else {
      return this.toTime(17 * 60 + 10 + this.overwork * 60);
    }
  }
}
