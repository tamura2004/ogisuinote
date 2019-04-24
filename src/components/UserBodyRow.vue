<template lang="pug">
user-row-layout
  template(v-slot:name): task-row-cell
    router-link(:to="`/app/user/${userId}/tasks`") {{ userName }}
  template(v-slot:plan): task-row-cell {{ plan | toTime }}
  template(v-slot:lasttime): task-row-cell {{ lasttime }}
  template(v-slot:overwork): task-row-cell {{ overwork | toTime }}
  template(v-slot:permit): task-row-cell
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import moment from 'moment';

@Component
export default class UserBodyRow extends Vue {
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
      .format('H 時 mm 分');
  }
}
</script>

<style lang="stylus" scoped>
</style>
