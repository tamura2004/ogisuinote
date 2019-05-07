<template lang="pug">
span
  template(v-if="!allowed")
    v-btn.ma-1.pa-2(@click="allow") 許可
  template(v-else)
    base-row-cell-body {{ managerName }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class ShiftAllowBtn extends Vue {
  @Prop() private userId!: string;
  @Prop() private date!: number;

  private get shiftId() {
    return this.$store.getters.shiftId(this.userId, this.date);
  }

  private get shift() {
    return this.$store.getters.shift(this.userId, this.date);
  }

  private get allowed() {
    return this.shift && this.shift.managerId;
  }

  private get managerId() {
    return this.$store.getters.userId;
  }

  private get managerName() {
    return this.shift && this.$store.getters.userName(this.shift.managerId);
  }

  private async allow() {
    await this.$store.dispatch(ACTION.WAIT,
      () => this.$store.dispatch(ACTION.ALLOW_SHIFT, {
        shiftId: this.shiftId,
        managerId: this.managerId,
      }),
    );
  }
}
</script>

<style lang="stylus" scoped>
</style>
