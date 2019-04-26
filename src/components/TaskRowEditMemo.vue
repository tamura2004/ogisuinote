<template lang="pug">
div
  base-text-field(
    v-if="edit"
    v-model="memo"
    @keydown.enter="save"
    @blur="edit=false"
  )
  base-row-cell-body(v-else @click="edit=true") {{ task.memo }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class TaskRowEditMemo extends Vue {
  @Prop() private taskId!: string;

  private edit: boolean = false;
  private memo: string = this.task.memo;

  private get task() {
    return this.$store.getters.task(this.taskId);
  }

  private save() {
    this.edit = false;
    this.$store.dispatch(ACTION.UPDATE_TASK_MEMO, this);
  }
}
</script>

<style lang="stylus" scoped>
</style>
