<template lang="pug">
v-container(fluid)
  v-layout(row align-center)
    v-flex(xs4)
      .display-1 {{ date | toDate }}
    v-flex(xs4)
      task-date-button(@click="yesterday"): v-icon navigate_before
      task-date-button(@click="today") 今日
      task-date-button(@click="tomorrow"): v-icon navigate_next
    v-flex(xs4)
      .headline.text-xs-right 稼働:{{ total | toTime }}
        span(v-if="overwork > 0") (残業:{{ overwork | toTime }})
  task-title-row
  task-body-row(
    v-for="[key, task] in Array.from(tasks)"
    :key="key"
    :taskId="key"
    :task="task"
    :userId="userId"
    :date="date"
  )
  task-row-new(:date="date" :userId="userId")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CREATE } from '@/types/ActionTypes';
import Task from '@/models/Task';
import moment from 'moment';

@Component
export default class TaskIndex extends Vue {
  private date = moment().startOf('day').valueOf();

  private get userId(): string {
    if (this.$store.state.user) {
      return this.$store.state.user.email;
    } else {
      return '';
    }
  }

  private get total(): number {
    return this.tasks.reduce((a, [, task]) => a += task.plan, 0);
  }

  private get overwork(): number {
    return this.total < 7.5 ? 0 : this.total - 7.5;
  }

  private get tasks() {
    return [...this.$store.state.tasks]
      .filter(([, task]) =>
        task.date === this.date &&
        task.userId === this.userId,
      );
  }

  private today() {
    this.date = moment().startOf('day').valueOf();
  }

  private yesterday() {
    this.date = moment(this.date).subtract(1, 'days').valueOf();
  }

  private tomorrow() {
    this.date = moment(this.date).add(1, 'days').valueOf();
  }
}
</script>

<style lang="stylus" scoped>
.subheading
  border solid 1px lightgrey
  height 48px
.b
  border solid 1px black
</style>
