<template lang="pug">
div
  base-select-time(
    v-if="edit"
    v-model="plan"
    @input="save"
    @blur="edit=false"
  )
  base-row-cell-body(v-else @click="click") {{ task.plan | toTime }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';
import { inTime } from '@/mixins/InTime';

@Component
export default class TaskRowEditPlan extends Vue {
  @Prop() private taskId!: string;
  @Prop() private date!: number;

  private edit: boolean = false;
  private plan: string = this.task.plan;

  private get task() {
    return this.$store.getters.task(this.taskId);
  }

  private click() {
    if (this.inTime) {
      this.edit = true;
    } else {
      alert('見込時間は当日の12:00以降は修正できません');
    }
  }

  private save() {
    this.$store.dispatch(ACTION.UPDATE_TASK_PLAN, this);
    this.edit = false;
  }

  // 締め切り前判定
  private get inTime(): boolean {
    return inTime(this.date);
  }
}
</script>

<style lang="stylus" scoped>
</style>
