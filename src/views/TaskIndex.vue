<template lang="pug">
v-container(fluid)
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
  .headline.text-xs-right 稼働:{{ total | toTime }}
    span(v-if="overwork > 0") (残業:{{ overwork | toTime }})
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CREATE } from '@/types/ActionTypes';
import Task from '@/models/Task';
import moment from 'moment';

@Component
export default class TaskIndex extends Vue {
  private get date() {
    return this.$store.getters.date;
  }

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

  private get tasks(): [string, Task][] {
    return this.$store.getters.tasks(this.userId, this.date);
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
