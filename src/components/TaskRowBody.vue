<template lang="pug">
div
  task-row-show(:task="task" @click.native="edit=true" v-if="!edit")
  task-row-edit(
    v-else
    :taskId="taskId"
    :task="task"
    :userId="userId"
    :date="date"
    @done="edit=false"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';

@Component
export default class TaskRowBody extends Vue {
  @Prop() private taskId!: string;
  @Prop() private task!: Task;
  @Prop() private userId!: string;
  @Prop() private date!: number;

  private edit: boolean = false;
}
</script>

<style lang="stylus" scoped>
</style>
