<template lang="pug">
  task-row-layout(v-if="!edit")
    template(v-slot:priority): task-row-cell {{ task.priority }}
    template(v-slot:name): task-row-cell {{ task.name }}
    template(v-slot:plan): task-row-cell {{ task.plan | toTime }}
    template(v-slot:actual): task-row-cell(@click.native="edit=true") {{ task.actual | toTime }}
    template(v-slot:memo): task-row-cell(@click.native="edit=true") {{ task.memo || '-' }}
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
export default class TaskRow extends Vue {
  @Prop() private taskId!: string;
  @Prop() private task!: Task;
  @Prop() private userId!: string;
  @Prop() private date!: number;

  private edit: boolean = false;
}
</script>

<style lang="stylus" scoped>
</style>
