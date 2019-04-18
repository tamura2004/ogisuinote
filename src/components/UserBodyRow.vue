<template lang="pug">
user-row-layout
  template(v-slot:name): task-row-cell
    router-link(:to="`/app/user/${userId}/tasks`") {{ userName }}
  template(v-slot:plan): task-row-cell {{ plan | toTime }}
  template(v-slot:actual): task-row-cell {{ actual | toTime }}
  template(v-slot:memo): task-row-cell {{ actual - plan | toTime }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';

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

  private get actual() {
    return this.tasks
      .map(([, task]) => task.actual || 0)
      .reduce((a, actual) => a + actual, 0);
  }
}
</script>

<style lang="stylus" scoped>
</style>
