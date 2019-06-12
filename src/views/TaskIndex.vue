<template lang="pug">
v-container(fluid)
  the-user-headline(:userId="userId")
  task-row-title
  task-row-edit(
    v-for="[key, task] in tasks"
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
import { db } from '@/plugins/firebase';
import * as ACTION from '@/types/ActionTypes';
import { daysBefore } from '@/plugins/datetimeUtil';
import Task from '@/models/Task';

@Component
export default class TaskIndex extends Vue {
  private unsubscribe: any;

  private async created() {
    const query = db.collection('tasks')
      .where('date', '>=', daysBefore(2))
      .where('userId', '==', this.userId);
    this.unsubscribe = await this.$store.dispatch(ACTION.LISTEN, {
      query,
      name: 'tasks',
      klass: Task,
    });
  }

  private destroyed() {
    this.unsubscribe();
  }

  private get date() {
    return this.$store.getters.date;
  }

  private get userId(): string {
    return this.$store.getters.userId;
  }

  private get tasks() {
    return this.$store.getters.tasks(this.userId, this.date);
  }
}
</script>

<style lang="stylus" scoped>
</style>
