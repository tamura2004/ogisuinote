<template lang="pug">
div
  .headline {{ userId }}
  task-title-row
  task-body-row(
    v-for="[key, task] in tasks"
    :key="key"
    :taskId="key"
    :task="task"
    :userId="userId"
    :date="date"
  )
  slot
  .headline.text-xs-right 稼働:{{ total | toTime }}
    span(v-if="overwork > 0") (残業:{{ overwork | toTime }})
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';

@Component
export default class UserTaskRows extends Vue {
  @Prop() private userId!: string;

  private get date() {
    return this.$store.getters.date;
  }

  private get total(): number {
    return this.tasks.reduce((a, [, task]) => a += task.plan, 0);
  }

  private get overwork(): number {
    return this.total < 7.5 ? 0 : this.total - 7.5;
  }

  private get tasks(): Array<[string, Task]> {
    return this.$store.getters.tasks(this.userId, this.date);
  }
}
</script>

<style lang="stylus" scoped>
</style>
