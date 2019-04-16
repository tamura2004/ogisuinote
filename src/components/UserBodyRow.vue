<template lang="pug">
user-row-layout
  template(v-slot:name): task-body-cell {{ userId }}
  template(v-slot:plan): task-body-cell {{ plan | toTime }}
  template(v-slot:actual): task-body-cell {{ plan | toTime }}
  template(v-slot:memo): task-body-cell {{ plan | toTime }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';

@Component
export default class UserBodyRow extends Vue {
  @Prop() private userId!: string;

  private get date() {
    return this.$store.getters.date;
  }

  private get tasks(): [string, Task][] {
    return this.$store.getters.tasks(this.userId, this.date);
  }

  private get plan() {
    return this.tasks.map(([, task]) => task.plan).reduce((a, plan) => a + plan, 0);
  }

}
</script>

<style lang="stylus" scoped>
</style>
