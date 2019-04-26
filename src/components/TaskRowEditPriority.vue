<template lang="pug">
div
  base-select-priority(
    v-if="edit"
    v-model="priority"
    @input="save"
    @blur="edit=false"
  )
  base-row-cell-body(v-else @click="edit=true") {{ task.priority }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class TaskRowEditPriority extends Vue {
  @Prop() private taskId!: string;

  private edit: boolean = false;
  private priority: string | null = null;

  private created() {
    this.priority = this.task.priority;
  }

  private get task() {
    return this.$store.getters.task(this.taskId);
  }

  private save() {
    this.$store.dispatch(ACTION.UPDATE_TASK_PRIORITY, this);
  }
}
</script>

<style lang="stylus" scoped>
</style>
