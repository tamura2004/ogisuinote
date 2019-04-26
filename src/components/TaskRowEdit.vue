<template lang="pug">
task-row-layout
  template(v-slot:priority): task-row-edit-priority(:taskId="taskId")
  template(v-slot:name): base-row-cell-body {{ task.name }}
  template(v-slot:plan): task-row-edit-plan(:taskId="taskId" :date="date")
  template(v-slot:actual): task-row-edit-actual(:taskId="taskId")
  template(v-slot:memo): task-row-edit-memo(:taskId="taskId")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class TaskRowEdit extends Vue {
  @Prop() private date!: number;
  @Prop() private userId!: string;
  @Prop() private taskId!: string;
  @Prop() private task!: Task;
}
</script>

<style lang="stylus" scoped>
</style>
