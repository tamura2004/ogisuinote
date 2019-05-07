<template lang="pug">
span
  template(v-if="overwork")
    base-row-cell-body {{ managerName }}
  template(v-else)
    v-btn.ma-1.pa-2(@click="allow") 許可
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class OverworkAllowBtn extends Vue {
  @Prop() private userId!: string;
  @Prop() private date!: number;

  private get overwork() {
    return this.$store.getters.overwork(this.userId, this.date);
  }

  private get managerId() {
    return this.$store.getters.userId;
  }

  private get managerName() {
    return this.overwork && this.$store.getters.userName(this.overwork.managerId);
  }

  private async allow() {
    await this.$store.dispatch(ACTION.WAIT,
      () => this.$store.dispatch(ACTION.ALLOW_OVERWORK, this),
    );
  }
}
</script>

<style lang="stylus" scoped>
</style>
