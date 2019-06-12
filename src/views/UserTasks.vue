<template lang="pug">
  task-layout(:userId="userId")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { db } from '@/plugins/firebase';
import * as ACTION from '@/types/ActionTypes';
import { daysBefore } from '@/plugins/datetimeUtil';
import Task from '@/models/Task';

@Component
export default class UserTasks extends Vue {
  @Prop() private userId!: string;
  private unsubscribe: any;

  private created() {
    const query = db.collection('tasks')
      .where('date', '>=', daysBefore(2))
      .where('userId', '==', this.userId);
    this.$store.dispatch(ACTION.LISTEN, {
      query,
      name: 'tasks',
      klass: Task,
    });
  }

  private destroyed() {
    this.unsubscribe();
  }
}
</script>

<style lang="stylus" scoped>
</style>
