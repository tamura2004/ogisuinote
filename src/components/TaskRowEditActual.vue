<template lang="pug">
div
  base-select-time(
    v-if="edit"
    v-model="actual"
    @input="save"
    @blur="edit=false"
  )
  base-row-cell-body(v-else @click="edit=true") {{ task.actual | toTime }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class TaskRowEditActual extends Vue {
  @Prop() private taskId!: string;

  private edit: boolean = false;
  private actual: string = this.task.actual;

  private get task() {
    return this.$store.getters.task(this.taskId);
  }

  private save() {
    this.$store.dispatch(ACTION.UPDATE_TASK_ACTUAL, this);
  }
}
</script>

<style lang="stylus" scoped>
</style>
